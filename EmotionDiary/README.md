# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<학습내용>

// Routes안에는 Route만 입력 가능하다

// useNavigate => 로그인 같은 경우 사용
const nav = useNavigate();
const onClickButton = () => {
nav('/new');
};

// :id 동적 경로인 URL Parameter
// scr/assets에서 import로 이미지 파일을 불러오면 캐싱되어서 이미지가 최적화된다(소수일 경우 / 다수일 경우에는 public에 저장)

// useSearchParams => ?value=hello
// 1. query string으로 값을 불러올 수 있다
// 2. setParams 함수로 query string 값 수정 가능
const [params, setParams] = useSearchParams();
