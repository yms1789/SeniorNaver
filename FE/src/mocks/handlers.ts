import { rest } from "msw";

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
];
