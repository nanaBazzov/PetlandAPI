const express = require("express"); // מאפשרת לנו תחנות רבות לבנית אפליקציות אינטרנט
const cors = require("cors"); // תחנת אבטחה של הדפדפן שמגבילה בקשות http עם שרתים אחרים ומציינת אילו תחומים נגשים למשאבים שלנו
const mongoose = require("mongoose"); // מספק לנו פונקציות על מנת לתפעל את המסמכים של אוסף מסד הנתונים שלנו בmongodb ועוזרת לנו להתחבר לדאה בייס שלנו
const app = express();
const cookieParser = require("cookie-parser"); // middleware which parses cookies attached to the client request object.
const authRoutes = require("./Routes/AuthRoutes");


mongoose.set('strictQuery', true);


app.listen(4100, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started Successfully.");
    }
});

mongoose
    .connect("mongodb://localhost:27017/jwt", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });


app.use(cors({
        origin: ["http://localhost:3000"], //origin path
    method:["GET","POST"],
    credentials: true,

})
);



app.use(cookieParser());
app.use(express.json());
app.use(authRoutes);






// cats

// cat hairball liver snack : price_1MJwTQJJ4Yph0q0GS9bbJdhr
//wet snack for cats chicken : price_1MJwV5JJ4Yph0q0G3IuEHSav
//cat toy balls with a bell : price_1MJwWNJJ4Yph0q0Gjl3ncoFb
//Laser ball for a cat: price_1MJwXNJJ4Yph0q0GcuZ8PidF
//Deluxe Cat Litter: price_1MJwYBJJ4Yph0q0GNmUBVQq8
//Crystal Litter for the cat : price_1MJwYjJJ4Yph0q0GpFNSF3Hs
//Round Cat Bed : price_1MJwZMJJ4Yph0q0GbvNPDNM3
//Igloo Bed for the cat : price_1MJwZuJJ4Yph0q0G9QqJ4QHZ
//Advance adult cat food - sensitive salmon: price_1MJwaXJJ4Yph0q0GmcpTVu54
//Nature's Protection Persian cat / long fur : price_1MJwbHJJ4Yph0q0GeIMfMqul
//Cat Instinct Ultimate Protein Enriched Chicken : price_1MJwbvJJ4Yph0q0GpUcEoK80
//Hills Science kittens food Chicken: price_1MJwcZJJ4Yph0q0GTfoiRob7
//Hills Science food for Adult Tuna Cat: price_1MJwdZJJ4Yph0q0GcL9YRE8C
//Hills Science food for Adult Cat Chicken: price_1MJwe3JJ4Yph0q0GpPI8ltyx
//Purina - cat food salmon: price_1MJwemJJ4Yph0q0GtI9K5XDC



// dogs

//Royal Canin Maxi-food for Adult: price_1MJwfZJJ4Yph0q0GU8fPbYP4
//Advance- food for mature dog: price_1MJwg2JJ4Yph0q0GvjQlB79X
//Advance- food for puppies:price_1MJwgUJJ4Yph0q0G2xYwVupQ
//Hilis - food for adult:price_1MJwhHJJ4Yph0q0GuKpt2Yid
//Nature's Protection- food for adult: price_1MJwhiJJ4Yph0q0GNDLIYZWZ
//Chunkies dog snack chicken sticks: price_1MJwi7JJ4Yph0q0GLWoYN8nU
//Yummiz Barbeque Chicken Dog Snack : price_1MJwiXJJ4Yph0q0GkwAQeR7U
//Dog Toy - Hot dog: price_1MJwjEJJ4Yph0q0GxAac7SvP
//Dog Toy - Basketball: price_1MJwjcJJ4Yph0q0GNET9nF7N
//Blue Valley-Chicken food for puppies : price_1MJwk5JJ4Yph0q0GhMv3LP85
//Bed for Dog: price_1MJwkcJJ4Yph0q0GkO4lp4iG
//Donuts Shape  orthopedic bed : price_1MJwl9JJ4Yph0q0GK5XdVYRh










