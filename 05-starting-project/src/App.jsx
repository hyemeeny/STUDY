import { useState } from "react";
import NewProject from "./componenets/NewProject";
import NoProjectSelected from "./componenets/NoProjectSelected";
import ProjectsSidebar from "./componenets/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    seletedProjectId: false,
    projects: [],
  });

  // 새로운 프로젝트 추가
  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        // 이전 상태 유지
        ...prevState,
        // 업데이트 된 상태 반환(null 새로운 프로젝트 추가 의미)
        seletedProjectId: true,
      };
    });
  };

  // 함수가 호출되는 곳에서 projectData 매개변수로 title, description, dueDate를 받는다.
  const handleAddProject = (projectData) => {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        // 이전 상태 유지하면서 새로운 return 객체에 복제되게 한다.
        ...prevState,
        // 첫번째 요소: 이전 프로젝트 배열 안으로 모두 복사하여 유지하면서 프로젝트 배열 업데이트
        // 두번째 요소: 추가될 새로운 프로젝트
        projects: [...prevState.projects, newProject],
      };
    });
  };

  console.log(projectsState);

  let content;
  // true면 새로운 프로젝트 추가
  if (projectsState.seletedProjectId === true) {
    content = <NewProject onAdd={handleAddProject} />;
  } else if (projectsState.seletedProjectId === false) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
