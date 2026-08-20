/* =========================================================
   JS YADAV TAXI SERVICE
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("active");

            const isOpen =
                navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =========================================================
   CLOSE MENU AFTER RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 760 &&
            navMenu
        ) {

            navMenu.classList.remove("active");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SET MINIMUM BOOKING DATE
========================================================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;

}


/* =========================================================
   BOOKING FORM
========================================================= */

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Get values */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const pickup =
                document
                    .getElementById("pickup")
                    .value
                    .trim();


            const destination =
                document
                    .getElementById("destination")
                    .value
                    .trim();


            const date =
                document
                    .getElementById("date")
                    .value;


            const passengers =
                document
                    .getElementById("passengers")
                    .value;


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /* Basic validation */

            if (
                !name ||
                !phone ||
                !pickup ||
                !destination ||
                !date
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            /* Format date */

            let formattedDate =
                date;


            const dateObject =
                new Date(
                    date + "T00:00:00"
                );


            if (
                !isNaN(
                    dateObject.getTime()
                )
            ) {

                formattedDate =
                    dateObject.toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    );

            }


            /*
               Create WhatsApp message.
            */

            let messageText =

                "Hello JS Yadav Taxi Service,%0A%0A" +

                "*New Taxi Booking Enquiry*%0A%0A" +

                "*Name:* " +
                encodeURIComponent(name) +
                "%0A" +

                "*Phone:* " +
                encodeURIComponent(phone) +
                "%0A" +

                "*Pickup:* " +
                encodeURIComponent(pickup) +
                "%0A" +

                "*Destination:* " +
                encodeURIComponent(destination) +
                "%0A" +

                "*Travel Date:* " +
                encodeURIComponent(formattedDate) +
                "%0A" +

                "*Passengers:* " +
                encodeURIComponent(passengers) +
                "%0A";


            if (message) {

                messageText +=

                    "*Additional Information:* " +

                    encodeURIComponent(message) +

                    "%0A";

            }


            messageText +=

                "%0APlease provide taxi availability and fare details.";


            /*
               JS Yadav Taxi Service
               WhatsApp number.
            */

            const whatsappNumber =
                "919312363224";


            const whatsappURL =

                "https://wa.me/" +

                whatsappNumber +

                "?text=" +

                messageText;


            /*
               Open WhatsApp.
            */

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }
        );

    });


/* =========================================================
   HEADER SHADOW ON SCROLL
========================================================= */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    function () {

        if (!header) {

            return;

        }


        if (
            window.scrollY > 20
        ) {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.25)";

        } else {

            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,0.15)";

        }

    }
);
