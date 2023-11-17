<div align="center">
  <img src="https://github.com/yms1789/Algorithm/assets/71623879/a28fa0d0-097d-4b3f-8ef9-b7181ebb3f22" width="180"/>
</div>
<br />
<div align="center">
  <h1>시니어 네이버</h1>
</div>
<br />
<p align="center">
  개발 기간 : 2023.10.09 ~ 2023.11.17 ( 7weeks ) </br>
  개발 인원 : 6명
<p align="center">

<br/><br/>

<div>
  <h2>프로젝트 소개</h2>
</div>
게이미피케이션을 통한 과소비 줄이기 습관 형성 서비스입니다.

<br />

## 배포 링크

### [https://ggok2.duckdns.org](http://haru-hannyan.com)

<br /><br />

## 구현 기능 목록

### 1. 챗봇

<br />
<div align="center">
  <img src="https://github.com/yms1789/Algorithm/assets/71623879/b97f085e-301d-4f53-8981-f2e40de7f419" width="80%" />
</div>

- 유저 친화적 서비스로 노인분들의 편의성을 위해 음성인식 형식으로 구현하였습니다
- 유저가 음성 데이터를 전달하면 이를 네이버 Stt api를 사용하여 텍스트로 변환을 합니다.
- 변환한 텍스트를 분석하고 특정 단어를 전달받으면 이에 맡는 병원,기상청 api 혹은 챗봇으로 텍스트를 전달합니다.
- 이후 각각의 api 혹은 챗봇에게 데이터를 받고 이를 알맞는 텍스트로 생성합니다.
- 생성한 텍스트는 네이버 TTS api에게 보내 음성데이터로 변환합니다.
- 변환한 음성데이터는 유저한테 보내주는 형식으로 Speech-To-Speech형식의 음성인식 AI 챗봇 서비스가 완성됩니다

<br /><br />

### 2. 장소 검색

<br />
<div align="center">
  <img src="https://github.com/yms1789/Algorithm/assets/71623879/d11f5c12-c15d-485e-b5f8-7aa81bb97505" width="80%" />
</div>

<br /><br />

### 3. 일자리 검색

<br />
<div align="center">
  <img src="https://github.com/yms1789/Algorithm/assets/71623879/2b9ff3d8-29bb-4e44-8ded-de42f37ab0a5" width="80%" />
</div>

<br /><br />

### 4. 큐레이션

<br />
<div align="center">
  <img src="https://github.com/kanghaeven/Frontend_practice/assets/122589773/2268d4ac-cec5-4eb1-b581-58e6ebbf43df" width="80%" />
  <img src="https://github.com/yms1789/Algorithm/assets/71623879/8ba3c447-333a-47c8-97e8-b2b20cd7cce2" width="80%">
</div>

<br /><br />

### 5. 유행어 사전

<br />
<div align="center">
  <img src="https://github.com/yms1789/Algorithm/assets/71623879/2b9ff3d8-29bb-4e44-8ded-de42f37ab0a5" width="80%" />
</div>

<br /><br />

### 6. MZ 사전

<br />
<div align="center">
  <img src="https://github.com/yms1789/Algorithm/assets/71623879/c4e667ca-0ce2-4cb9-bcf1-80163ff06964" width="80%" />
</div>

<br /><br />

## 사용한 기술

### 프론트엔드

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/640px-Typescript_logo_2020.svg.png" />
          <p align="center">
            TypeScript
          <p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F2f3409f4f8b64d5f880195061aa481ab" />
          <p align="center">
            React
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/640px-Vitejs-logo.svg.png" />
          <p align="center">
            Vite
          </P>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="40" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" />
          <p align="center">
            Styled-component
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="70" src="https://github.com/yms1789/Algorithm/assets/71623879/def1fc8c-7971-4376-92b0-e4fdd5ef06d1" />
          <p align="center">
            Recoil
          </p>
        </div>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://mulder21c.github.io//jest/img/jest.png" />
          <p align="center">
            Jest
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/640px-GitHub_Invertocat_Logo.svg.png" />
          <p align="center">
            Git
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://github.com/yms1789/Algorithm/assets/71623879/4989caf0-a175-4bc9-918f-bfa5a6a13ad2" />
          <p align="center">
            react-Query
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://camo.githubusercontent.com/e7eb6839f0d42fffcd7435133609f4fe6a2cad787439321d809c273d66ac4c77/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f65736c696e742d69636f6e2e737667" />
          <p align="center">
            Eslint
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://camo.githubusercontent.com/82935f72bd8f7a84991ceeb91cba325f0ae3b00f7fb2af42da60a81d3ff631b4/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f70726574746965722d69636f6e2e737667" />
          <p align="center">
            Prettier
          </p>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<!-- ### 백엔드 -->
<!--
<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/640px-Typescript_logo_2020.svg.png" />
          <p align="center">
            Spring Security
          <p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F2f3409f4f8b64d5f880195061aa481ab" />
          <p align="center">
            React
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/640px-Vitejs-logo.svg.png" />
          <p align="center">
            Vite
          </P>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="40" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" />
          <p align="center">
            Styled-component
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="70" src="https://github.com/yms1789/Algorithm/assets/71623879/def1fc8c-7971-4376-92b0-e4fdd5ef06d1" />
          <p align="center">
            Recoil
          </p>
        </div>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://mulder21c.github.io//jest/img/jest.png" />
          <p align="center">
            Jest
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/640px-GitHub_Invertocat_Logo.svg.png" />
          <p align="center">
            Git
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://github.com/yms1789/Algorithm/assets/71623879/4989caf0-a175-4bc9-918f-bfa5a6a13ad2" />
          <p align="center">
            react-Query
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://camo.githubusercontent.com/e7eb6839f0d42fffcd7435133609f4fe6a2cad787439321d809c273d66ac4c77/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f65736c696e742d69636f6e2e737667" />
          <p align="center">
            Eslint
          </p>
        </div>
      </td>
      <td align="center" valign="middle">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" width="500" height="1" />
          <img width="50" src="https://camo.githubusercontent.com/82935f72bd8f7a84991ceeb91cba325f0ae3b00f7fb2af42da60a81d3ff631b4/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f70726574746965722d69636f6e2e737667" />
          <p align="center">
            Prettier
          </p>
        </div>
      </td>
    </tr>
  </tbody>
</table> -->

<br /><br />

## KKOGKKOG GAMES 팀원 소개

| 이름 | 강해빈                                                                                              | 김지훈                                                                                              | 여민수                                                                                              |
| :--: | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
|      | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> |
| 역할 | FRONT-END                                                                                           | FRONT-END                                                                                           | FRONT-END                                                                                           |
| 담당 | ∙ 회원 관리 <br> ∙ 소비 내역 분석                                                                   | ∙ 게임 <br> ∙ 매칭 시스템                                                                           | ∙ 초기 환경 구축 <br> ∙ 커스터마이징 <br> ∙ 페이지 라우팅 <br> ∙ 푸시알림                           |

| 이름 | 강노아                                                                                              | 권민우                                                                                              | 김민석                                                                                              |
| :--: | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
|      | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> |
| 역할 | INFRA, BACK-END                                                                                     | 팀장, BACK-END                                                                                      | BACK-END                                                                                            |
| 담당 | ∙ 서버 구축 <br> ∙ 계좌 <br> ∙ 랭킹 시스템                                                          | ∙ 초기 환경 구축 <br> ∙ 회원관리 <br> ∙ 푸시알림 <br> ∙ 소비 내역 분석                              | ∙ 게임 <br> ∙ 매칭 시스템 <br> ∙ 커스터마이징                                                       |

<br>

<!-- ## 기술 스택 ∙ 개발 환경

<table>
<tr>
 <td align="center">프론트엔드</td>
 <td>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=React&logoColor=ffffff"/>  <img src="https://img.shields.io/badge/androidstudio-3DDC84?style=for-the-badge&logo=androidstudio&logoColor=ffffff"/> <br>

  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=ffffff"/>  <br>

React-Native CLI: 0.72.4 <br>

ANDROID SDK & NDK VERSION <br> └─ MIN_SDK: 26 <br> └─ COMPILE_SDK: 34 <br> └─
NDK_VERSION: 23.1.7779620 <br> Virtual Device <br> └─ Pixel 7 <br> └─ API 33
<br>

</tr>
<tr>
 <td align="center">백엔드</td>
 <td>
  <img src="https://img.shields.io/badge/Java-orange?style=for-the-badge&logo=Java&logoColor=white"/>
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=ffffff"/>

  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=ffffff"/><br>
  Java 11 <br>
  └─ java OpenJDK <br>
  └─ Spring Boot <br>
  │　└─ Spring Data JPA <br>
  │　└─ Spring Data redis <br>
  │　└─ oauth2 <br>
  │　└─ JWT <br>
  │　└─ JUnit <br>
  │　└─ Lombok <br>
  │　└─ SpringDocs <br>
  └─ Gradle 8.2.1 <br>

Python 3.10 <br> └─ Flask <br>

</tr>
<tr>
 <td align="center">서버</td>
 <td>
  <img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=ffffff"/><br>
Ubuntu 20.04 <br>
Docker 24.0.5 <br>
Docker-Compose 1.25.0 <br>
Jenkins 2.414.1 <br>
</tr>
<tr>
 <td align="center">데이터베이스</td>
 <td>
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=ffffff"/><br>
  MySQL 8.0.33
  </td>
</tr>
<tr>
<tr>
 <td align="center">포맷팅</td>
 <td>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=ffffff"/>
  </td>
</tr>
<tr>
 <td align="center">IDE</td>
 <td>
  <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea&logoColor=ffffff"/>
 </td>
</tr>
<tr>
 <td align="center">형상 / 이슈 관리</td>
 <td>
    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
    <img src="https://img.shields.io/badge/Gitlab-FC6D26?style=for-the-badge&logo=Gitlab&logoColor=white"/>
    <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"/>
       <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/>
 </td>
</tr>
<tr>
 <td align="center">UXUI</td>
 <td>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
 </td>
</tr>
<tr>
 <td align="center">기타</td>
 <td>
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
<img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white"/>
  <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/>
<img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Mattermost&logoColor=white"/> <br>
S3 2.2.6 <br>
postman 10.17.0 <br>
mattermost 7.8.6 <br>

 </td>
</tr>
</table>

<br> -->

## 아키텍처

<img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/architectureGudgement.png" width="1500"/>

<br>

## ERD

<img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/erd.jpg" width="1500"/>

<br>
