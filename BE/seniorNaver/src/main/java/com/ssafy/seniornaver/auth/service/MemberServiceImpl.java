package com.ssafy.seniornaver.auth.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.seniornaver.auth.dto.*;
import com.ssafy.seniornaver.auth.dto.Request.*;
import com.ssafy.seniornaver.auth.dto.Response.LogInResponseDto;
import com.ssafy.seniornaver.auth.dto.Response.MemberResponseDto;
import com.ssafy.seniornaver.auth.entity.Keyword;
import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.auth.entity.enumType.AuthProvider;
import com.ssafy.seniornaver.auth.entity.enumType.Role;
import com.ssafy.seniornaver.auth.jwt.JwtProvider;
import com.ssafy.seniornaver.auth.repository.MemberRepository;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{
	private final MemberRepository memberRepository;
	private final KeywordRepository keywordRepository;
	private final JwtProvider jwtProvider;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final S3Uploader s3Uploader;

	private final AmazonS3Client amazonS3Client;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public String signUp(SignUpRequestDto signUpRequestDto) {
		if (memberRepository.findByMemberId(signUpRequestDto.getMemberId()).isPresent()) {
			throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_USER_ID);
		}

		if (signUpRequestDto.getMemberId().toLowerCase().contains("admin")) {
			throw new BadRequestException(ErrorCode.INVALID_ADMIN);
		}

		Member member = Member.builder()
			.memberId(signUpRequestDto.getMemberId())
			.name(signUpRequestDto.getName())
			.email(signUpRequestDto.getEmail())
			.password(signUpRequestDto.getPassword())
			.profileUrl("https://d33nz7652hemr5.cloudfront.net/Profile/user-basic-profile.png")
			.role(Role.USER)
			.authProvider(AuthProvider.EMPTY)
			.build();

		member.passwordEncode(bCryptPasswordEncoder);
		return memberRepository.save(member).getMemberId();
	}

	@Transactional
	public LogInResponseDto logIn(LogInRequestDto logInRequestDto)  {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		if (!memberRepository.existsByMemberId(logInRequestDto.getMemberId())) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		}
		Member member = memberRepository.findByMemberId(logInRequestDto.getMemberId()).get();
		if (!bCryptPasswordEncoder.matches(logInRequestDto.getPassword(), member.getPassword())) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_PASSWORD);
		}

		// 토큰 발급
		TokenDto accessTokenDto = jwtProvider.createAccessToken(logInRequestDto.getMemberId(), member.getAuthProvider());
		TokenDto refreshTokenDto = jwtProvider.createRefreshToken(logInRequestDto.getMemberId(), member.getAuthProvider());

		member.updateRefreshToken(refreshTokenDto.getToken(), refreshTokenDto.getTokenExpirationTime());

		return LogInResponseDto.builder()
			.memberId(member.getMemberId())
			.nickname(member.getNickname())
			.email(member.getEmail())
			.mobile(member.getMobile())
			.accessToken(accessTokenDto.getToken())
			.refreshToken(refreshTokenDto.getToken())
			.refreshTokenExpirationTime(refreshTokenDto.getTokenExpirationTime())
			.build();
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	@Scheduled(cron = "0 0 0 * * ?")
	public void resetIsChecked() {
		List<Member> allMembers = memberRepository.findAll();
		for (Member member : allMembers) {
			System.out.println(member.getMemberId());
		}
		memberRepository.saveAllAndFlush(allMembers);
	}


	/*
	 ** 로그아웃 -> DB에 저장된 리프레쉬 토큰 최신화
	 */
	public void logOut(LogOutRequestDto logOutRequestDto) {
		Member member = memberRepository.findByRefreshToken(logOutRequestDto.getRefreshToken()).get();
		member.expireRefreshToken(new Date());
	}

	@Override
	public String addDetails(DetailRequestDto DetailRequestDto, MultipartFile file) throws IOException {
		// memberId로 Member 엔티티 조회
		Member member = memberRepository.findByMemberId(DetailRequestDto.getMemberId())
				.orElseThrow(() -> new IllegalArgumentException("멤버를 찾을 수 없습니다."));

		// Member 엔티티의 region과 nickname 업데이트
		member.updateRegionAndNickname(DetailRequestDto.getRegion(), DetailRequestDto.getNickname());

		// Keyword 엔티티의 keywords 저장
		for (String keyword : DetailRequestDto.getKeywords()) {
			Keyword keywordEntity = new Keyword(keyword, member);
			keywordRepository.save(keywordEntity);
		}

		// 사진 업로드 로직 추가
		if (file != null && !file.isEmpty()) {
			String uploadFiles = s3Uploader.uploadFiles(file, "Profile");
			member.updateProfileUrl(uploadFiles);
		}

		// Member 엔티티 저장
		memberRepository.save(member);

		return DetailRequestDto.getMemberId();
	}



	@Override
	public MemberResponseDto getMemberInfo(String memberId) {
		Member member = memberRepository.findByMemberId(memberId).orElseThrow(
				() -> new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID)
		);

		List<Keyword> keywords = keywordRepository.findByMember(member);
		List<String> keywordStrings = keywords.stream().map(Keyword::getKeyword).collect(Collectors.toList());


		return MemberResponseDto.builder()
				.memberId(member.getMemberId())
				.mobile(member.getMobile())
				.name(member.getName())
				.nickname(member.getNickname())
				.email(member.getEmail())
				.profileUrl(member.getProfileUrl())
				.region(member.getRegion())
				.keywords(keywordStrings)
				.build();
	}

	@Transactional(readOnly = true)
	public TokenDto getAccessToken(String refreshToken) {
		String memberId = (String)jwtProvider.get(refreshToken).get("memberId");
		String provider = (String)jwtProvider.get(refreshToken).get("provider");
		System.out.println("in getAccessToken " + memberId + "  " + provider);

		if (!memberRepository.existsByMemberIdAndAuthProvider(memberId, AuthProvider.findByCode(provider.toLowerCase()))) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		} else if (jwtProvider.isExpiration(refreshToken)) {
			throw new BadRequestException(ErrorCode.TOKEN_EXPIRED);
		}

		return jwtProvider.createAccessToken(memberId, AuthProvider.findByCode(provider));
	}

	public Boolean validMemberId(String memberId) {
		Optional<Member> user = memberRepository.findByMemberId(memberId);
		return getValid(user, memberId);
	}

	public Boolean validNickname(String nickname) {
		Optional<Member> user = memberRepository.findByNickname(nickname);
		return getValid(user, nickname);
	}

	private static Boolean getValid(Optional<Member> user, String userinfo) {
		if (userinfo.toLowerCase().contains("admin"))
			return false;
		return !user.isPresent();
	}

}
