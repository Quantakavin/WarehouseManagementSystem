import "../styles/Error404.scss";
import Image from "../assets/error404.png";

function Error404() {
    const URL = window.location.href;

    return (
        <>
            <head>
                <title>Error 404 (Not Found)</title>
            </head>
            <body className="mainBody">
                <a href="/"><img className="image" src={Image}></img></a>
                <p>
                    Oops. The page you are looking for cannot be found.
                </p>
                <p>
                    Please return to the homepage.
                </p>
                <button className="button">Home</button>
            </body>
        </>
    );
}

export default Error404;