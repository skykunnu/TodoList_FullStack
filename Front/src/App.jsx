import TodoList from './TodoList'
import bgImg from "./assets/BgImage.jpg"
function App() {

  return (
    <div className='h-[100vh] w-[100vw] bg-no-repeat bg-cover bg-center py-8 backdrop-blur-md bg-black/10' style={{backgroundImage:`url(${bgImg})` }}>
    <TodoList/>
       
    </div>
  )
}

export default App
