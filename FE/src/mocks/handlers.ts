import { rest } from "msw";
import hoveredImg from "../assets/Frame 185.png";
import nonhoveredImg from "../assets/Frame 186.png";

export const handlers = [
  rest.get("/test/places", (req, res, ctx) => {
    console.log("req", req);
    return res(
      ctx.json([
        {
          title: "title 1",
          image: "image 1",
          mapx: "x좌표",
          mapy: "y좌표",
        },
        {
          title: "title 2",
          image: "image 2",
          mapx: "x좌표",
          mapy: "y좌표",
        },
      ]),
      ctx.status(200),
    );
  }),
  rest.post("/test/chats", (req, res, ctx) => {
    const audio = req.body;
    console.log(audio);
    return res(ctx.status(201), ctx.json(audio));
  }),
  rest.get("/test/jobs", (req, res, ctx) => {
    const response = {
      pageNo: 1,
      totalCount: 17,
      items: {
        item: [
          {
            acptKMthd: "이메일",
            deadline: "마감",
            emplymShpNm: "시간제일자리",
            jobId: "RECR_000000000013950",
            jobcls: "A08009",
            jobclsNm: "기타",
            recrtTitle: "[서울시립미술관 르누아르전] 전시장 지킴이 모집",
            workPlaceNm: "중구",
          },
          {
            acptMthd: "이메일",
            deadline: "마감 X",
            emplymShpNm: "시간제일자리",
            jobId: "RECR_000000000013951",
            jobclsNm: "기타",
            recrtTitle: "[서울시립박물관] 화장실 지킴이 모집",
            workPlaceNm: "북구",
          },
        ],
      },
    };
    const response3 = {
      pageNo: 1,
      totalCount: 17,
      items: {
        item: [
          {
            acptKMthd: "이메일",
            deadline: "마감",
            emplymShpNm: "시간제일자리",
            jobId: "RECR_000000000013950",
            jobcls: "A08009",
            jobclsNm: "기타",
            recrtTitle: "[서울시립미술관 르누아르전]",
            workPlaceNm: "중구",
          },
          {
            acptMthd: "이메일",
            deadline: "마감 X",
            emplymShpNm: "시간제일자리",
            jobId: "RECR_000000000013951",
            jobclsNm: "기타",
            recrtTitle: "[서울시립박물관]",
            workPlaceNm: "북구",
          },
        ],
      },
    };
    const response2 = {
      pageNo: 1,
      totalCount: 46948,
      items: {
        item: [
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K120252311010023",
            jobclsNm: null,
            recrtTitle: "[송도 크레셈] 지식정보단지 *(남녀무관)미화원* 모집",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K131312311010030",
            jobclsNm: null,
            recrtTitle: "축산물 생산현장직 모집",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K120252311010006",
            jobclsNm: null,
            recrtTitle: "[나나성형외과] 신논현역 도보1분 인근 성형외과 *워싱담당 미화* 모집 (1명)",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "KJK2002311010005",
            jobclsNm: null,
            recrtTitle: "[해솔1단지]실내 미화원",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "KJAS002311010002",
            jobclsNm: null,
            recrtTitle: "[덕소쌍용스윗닷홈리버] 아파트 경비원 모집",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K151132311010038",
            jobclsNm: "사무보조",
            recrtTitle: "바른시스템(주) 본사 현장 관리 담당 직원 채용",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K151152311010068",
            jobclsNm: null,
            recrtTitle: "생산관리 및 조립업무 가능자 모집 (화성정남)",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "KJKZ002311010011",
            jobclsNm: null,
            recrtTitle:
              "의정부 장암현대2차 아파트 경비반장/경비원 채용합니다.(장애인등록증 또는 장애인복지카드 소지자 우대)",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K120252311010010",
            jobclsNm: null,
            recrtTitle: "[방배노인복지관] 사당역 인근 건물 미화원 1명",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "KJKN002311010011",
            jobclsNm: null,
            recrtTitle: "[망포동] 영통SK VIEW 아파트 분리수거 미화원 모집",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K170052311010057",
            jobclsNm: "농림어업",
            recrtTitle: "대전대학교 취업지원관 직원 채용 공고",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K150122311010071",
            jobclsNm: null,
            recrtTitle: "케이엠앤아이 경비직 모집",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K151152311010124",
            jobclsNm: null,
            recrtTitle: "(주)리썸 에스앤에스 (삼성전자 수원) 주차관리 야간 격일교대 채용",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K151232311010056",
            jobclsNm: null,
            recrtTitle: "서비스 예약, 상담, CS, 사무 직원 모집",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K151422311010072",
            jobclsNm: null,
            recrtTitle: "환경 컨설턴트 모집",
            workPlaceNm: null,
          },
          {
            acptMthd: "방문",
            deadline: "접수중",
            emplymShpNm: "CM0105",
            jobId: "K151632311010067",
            jobclsNm: null,
            recrtTitle: "인력관리(경비/미화/시설 등) 및 영업관리 정직원 채용(서울/경기/인천 담당)",
            workPlaceNm: null,
          },
        ],
      },
    };

    // console.log(req.url.searchParams.get("workplace"), req.url.searchParams.get("keyword"));

    if (req.url.searchParams.get("keyword") === "미화원")
      return res(ctx.delay(1000), ctx.json(response3), ctx.status(200));
    if (req.url.searchParams.get("workplace") && req.url.searchParams.get("keyword"))
      return res(ctx.delay(1000), ctx.json(response), ctx.status(200));
    return res(ctx.delay(1000), ctx.json(response2), ctx.status(200));
  }),

  rest.get("/carousel", (req, res, ctx) => {
    return res(
      ctx.json({
        curationImages: [
          "https://newsimg-hams.hankookilbo.com/2023/10/30/20e18974-774c-4f89-b1f4-e3861bdab60f.jpg",
          "https://imgnews.pstatic.net/image/629/2023/11/10/202339301699570052_20231110074901855.jpg?type=w647",
          "https://res.heraldm.com/content/image/2022/05/09/20220509000805_0.jpg",
          "https://flexible.img.hani.co.kr/flexible/normal/718/431/imgdb/child/2022/0728/53_16589695226816_5916589695085075.jpg",
          "https://src.hidoc.co.kr/image/lib/2016/1/13/20160113103847160_0.jpg",
          "https://www.junggi.co.kr/data/article/20231110/654d9c6e9114d.jpg",
          "https://imgnews.pstatic.net/image/032/2023/11/10/0003260416_001_20231110120901096.jpeg?type=w647",
          "https://imgnews.pstatic.net/image/088/2023/11/10/0000845239_001_20231110123601189.png?type=w647",
          "https://cdn.lkp.news/news/photo/202311/38859_50849_1221.png",
          "https://cdnimage.ebn.co.kr/news/AKR1202311101200239910/news-p.v1.20231110.ab181baadd8b4bca9d4042726933ad42_P1.png",
        ],
        curationTexts: [
          "밤 되면 이 가수 공연장에 등장하는 '효도텐트'",
          "영웅시대 밴드(나눔모임), 56번째 쪽방촌 도시락 봉사",
          "“5060 잡았다” 불황 모르는 팬덤 경제",
          "더 건강하고 부유해진 젊은 노인들, 소비패권 쥐게 된다",
          "성형은 젊은 층의 전유물이 아니다.'회춘성형'",
          "밤이 더 아름다운 여행…‘대한민국 밤밤곡곡’",
          "주말에 붉게 물든 단풍 보러 갈까 했더니 ‘영하권’",
          "“격무, 스트레스에 실명”, 악성민원 시달린 공무원 국가유공자로 인정",
          "대법원장·헌재소장 공백 현실화",
          "HCN “지역 밀착·참여형 오리지널 콘텐츠 인기”",
        ],
        mzWords: [
          "탕후루",
          "알잘딱깔센",
          "어쩔티비",
          "파이어족",
          "치맥",
          "저메추",
          "얼죽아",
          "아샷추",
          "점메추",
          "아아",
        ],
        places: [
          [
            "https://a.cdn-hotels.com/gdcs/production60/d893/3172bd6f-726c-4561-810f-deec13d17a6e.jpg?impolicy=fcrop&w=800&h=533&q=medium",
            "경복궁",
          ],
          ["http://tong.visitkorea.or.kr/cms/resource/85/2031885_image2_1.jpg", "감로암"],
          ["http://tong.visitkorea.or.kr/cms/resource/36/1984636_image2_1.jpg", "길산근린공원"],
          ["http://tong.visitkorea.or.kr/cms/resource/62/2612062_image2_1.bmp", "거리공원"],
          ["http://tong.visitkorea.or.kr/cms/resource/84/2791384_image2_1.jpg", "거북선나루터"],
          ["http://tong.visitkorea.or.kr/cms/resource/36/1984636_image2_1.jpg", "건청궁"],
          ["http://tong.visitkorea.or.kr/cms/resource/81/1894481_image2_1.jpg", "강서습지생태공원"],
          ["http://tong.visitkorea.or.kr/cms/resource/36/1984636_image2_1.jpg", "경운동민병옥가옥"],
          [
            "http://tong.visitkorea.or.kr/cms/resource/59/1568059_image2_1.jpg",
            "고당조만식선생동상",
          ],
          ["http://tong.visitkorea.or.kr/cms/resource/36/1984636_image2_1.jpg", "경희궁공원"],
        ],
      }),
    );
  }),
];
