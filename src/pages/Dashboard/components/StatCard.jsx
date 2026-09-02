import "./StatCard.css";

function StatCard({

    title,

    value,

    change,

    icon:Icon,

    color,

}){

    return(

        <div className="stat-card">

            <div className="stat-top">

                <div
                    className="stat-icon"
                    style={{

                        background:color

                    }}
                >

                    <Icon/>

                </div>

            </div>

            <h3>

                {value}

            </h3>

            <h4>

                {title}

            </h4>

            <span>

                {change}

            </span>

        </div>

    )

}

export default StatCard;