import "../styles/Error404.scss";
import BrandLogo from "../assets/navbarbrand.png";

function Error404() {
    const URL = window.location.href;

    return (
        <>
            <head>
                <title>Error 404 (Not Found)</title>
            </head>
            <body className="mainBody">
                <a href="/"><span aria-label="ISDN WMS"><img className="logo" src={BrandLogo}></img></span></a>
                <p>
                    <b>Error 404. Page Not Found</b>
                </p>
                <p>
                    <p>
                        The requested URL "{URL}" was not found on this server.
                    </p>
                </p>
            </body>
        </>
    );
}

export default Error404;