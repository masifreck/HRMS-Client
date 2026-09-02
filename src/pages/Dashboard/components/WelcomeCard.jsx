import "./WelcomeCard.css";

function WelcomeCard() {

    const today = new Date();

    const date = today.toLocaleDateString("en-IN",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });

    return (

        <div className="welcome-card">

            <div>

                <h1>

                    👋 Welcome back, Mohd Asif

                </h1>

                <p>

                    Here's what's happening in your organization today.

                </p>

            </div>

            <div className="today-date">

                {date}

            </div>

        </div>

    );

}

export default WelcomeCard;