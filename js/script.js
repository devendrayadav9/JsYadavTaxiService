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
   BOOKING DATE
   ALLOW TODAY + NEXT 15 DAYS ONLY
========================================================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    /*
       Format JavaScript Date
       as YYYY-MM-DD
    */

    function formatDate(date) {

        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    /*
       Get today's date
    */

    const today =
        new Date();


    /*
       Remove time so date comparison
       works correctly.
    */

    today.setHours(
        0,
        0,
        0,
        0
    );


    /*
       Minimum booking date = TODAY
    */

    const minDate =
        new Date(today);


    /*
       Maximum booking date =
       TODAY + 15 DAYS
    */

    const maxDate =
        new Date(today);


    maxDate.setDate(
        maxDate.getDate() + 15
    );


    /*
       Set calendar minimum
       and maximum dates.
    */

    dateInput.min =
        formatDate(minDate);


    dateInput.max =
        formatDate(maxDate);


    /*
       Validate date when user
       changes the calendar.
    */

    dateInput.addEventListener(
        "change",
        function () {

            if (
                !this.value
            ) {

                return;

            }


            if (
                this.value < this.min ||
                this.value > this.max
            ) {

                alert(
                    "Please select a travel date between today and the next 15 days."
                );


                this.value = "";

            }

        }
    );

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


            /* =================================================
               GET FORM VALUES
            ================================================= */

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


            /* =================================================
               BASIC VALIDATION
            ================================================= */

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


            /* =================================================
               TRAVEL DATE VALIDATION
               TODAY + NEXT 15 DAYS
            ================================================= */

            const selectedDate =
                new Date(
                    date + "T00:00:00"
                );


            const currentDate =
                new Date();


            currentDate.setHours(
                0,
                0,
                0,
                0
            );


            const maximumDate =
                new Date(currentDate);


            maximumDate.setDate(
                maximumDate.getDate() + 15
            );


            /*
               Check if selected date is
               before today or after
               the 15-day limit.
            */

            if (
                selectedDate < currentDate ||
                selectedDate > maximumDate
            ) {

                alert(
                    "Please select a travel date between today and the next 15 days."
                );

                return;

            }


            /* =================================================
               FORMAT TRAVEL DATE
            ================================================= */

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


            /* =================================================
               CREATE WHATSAPP MESSAGE
            ================================================= */

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


            /* =================================================
               ADDITIONAL INFORMATION
            ================================================= */

            if (message) {

                messageText +=

                    "*Additional Information:* " +

                    encodeURIComponent(message) +

                    "%0A";

            }


            /* =================================================
               FINAL MESSAGE
            ================================================= */

            messageText +=

                "%0APlease provide taxi availability and fare details.";


            /* =================================================
               WHATSAPP NUMBER
            ================================================= */

            const whatsappNumber =
                "919312363224";


            /* =================================================
               CREATE WHATSAPP URL
            ================================================= */

            const whatsappURL =

                "https://wa.me/" +

                whatsappNumber +

                "?text=" +

                messageText;


            /* =================================================
               OPEN WHATSAPP
            ================================================= */

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
