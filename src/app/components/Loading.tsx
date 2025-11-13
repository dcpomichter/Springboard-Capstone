import "./Loading.css"

export default function Loading(props: any) {
    return (
        <div className="rocket-loader">
            <div className="rocket">
                <div className="rocket-extras"></div>
                <div className="jet"><span></span></div>
            </div>
            <br />
            {props.message}
        </div>
    )
}
