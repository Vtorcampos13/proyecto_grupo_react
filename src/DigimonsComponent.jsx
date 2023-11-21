import { useState } from "react";

const Digimon = ({ data }) => {
    const [loaded, setLoaded] = useState(false);

    let className = "digimon-card";

    if (!loaded) {
        className += " hidden";
    }

    return (
        <article className={className}>
            <h2>{data.name.toUpperCase()}</h2>
            <img src={data.images[0].href} alt={`imagen de ${data.name}`} onLoad={() => { setLoaded(true) }} />
        </article>
    );
};

export default Digimon;
