import { useEffect } from "react";
import { fetchDataFromAPi } from "./ultis/api.js"
import { useDispatch, useSelector } from "react-redux";
import { getAPiConfigurations,getGenres } from "./redux/slice/homeSlice.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx"
import SearchResult from "./pages/searchResult/SearchResult.jsx"
import Explore from "./pages/explore/Explore.jsx"
import PageNotFound from "./pages/404/PageNotFound.jsx"

function App() {

  const dispatch = useDispatch();
  const getTotallPages = useSelector(state => state.homeReducer.url)
  useEffect(()=>{
    apiTesting();
    genesCall();
  },[])

  const apiTesting = () =>{
    fetchDataFromAPi('/configuration')
        .then((res) => {
          // console.log(res);
          const url = {
            backdrop : res.images.secure_base_url + "original",
            poster : res.images.secure_base_url + "original",
            profile : res.images.secure_base_url + "original",
          }
          dispatch(getAPiConfigurations(url))
        })
  }

  //call the api for generes category

  const genesCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromAPi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    //console.log(data);
    data.map(({ genres }) =>{
      return genres.map((item) =>{
        (allGenres[item.id] = item)
      })
    })
    //console.log(allGenres);
    dispatch(getGenres(allGenres));
  }

  return (
  //  <div className="App">
  //   {getTotallPages?.total_pages}
  //  </div>

        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={ <Home/> }></Route>
            <Route path="/:mediaType/:id" element={<Details/>}></Route>
            <Route path="/search/:query" element={<SearchResult/>}></Route>
            <Route path="/explore/:mediaType" element={<Explore/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
        <Footer/>
        </BrowserRouter>

  )
}

export default App
