
//==============================================================
// ================= Global variables ==========================
//==============================================================

// a dummy array of commentObject --- can be loaded from another source
var commentsArray = [
    {
        writername: "Lao Tzu",
        date:"21.01.2020",
        topic: "The journey of a thousand miles begins with one step."
    } ,
    {
        writername: "Joe Kennedy",
        date:"15.07.2020",
        topic: "That which does not kill us makes us stronger."
    },
    {
        writername: "Friedrich Nietzsche",
        date:"15.05.2021",
        topic: "When the going gets tough, the tough get going."
    }
]

// a dummy array of numbers represents rating values
// [5star, 4star, 3star, 2star, 1star]
var ratingResArr = [100, 63, 30, 12, 2];

// ============================================================================


//==============================================================
// ================= Functions for APIs ==========================
//==============================================================

// function to change active class for nav item
function ChangeActiveState(e) 
{
    var element = document.querySelectorAll(".active");
    [].forEach.call(element, function(elm) {
        elm.classList.remove("active");
    });
    e.target.className = "active";
    
    switch (e.target.innerHTML) {
        case "Home":
            var elmnt = document.getElementById("imageSlidder");
            elmnt.scrollIntoView({behavior: 'smooth'});
            break;
        case "About Us":
            var elmnt = document.getElementById("aboutUsSection");
            elmnt.scrollIntoView({behavior: 'smooth'});
        break;
        case "Comments":
            var elmnt = document.getElementById("commentsSection");
            elmnt.scrollIntoView({behavior: 'smooth'});
            commentsSection
            break;
        case "Write us":
            var elmnt = document.getElementById("contactUsSection");
            elmnt.scrollIntoView({behavior: 'smooth'});
            break;
        case "Rating system":
                var elmnt = document.getElementById("ratingSystemSection");
                elmnt.scrollIntoView({behavior: 'smooth'});
            break;
        default:
            var elmnt = document.getElementById("userAddedSections");
            elmnt.scrollIntoView({behavior: 'smooth'});
            break;
    }
}

// To open the add item menu
function ShowAddItemMenu(){
    var element = document.getElementById("addItemPopUp")
    element.style.display = "block"
}

// To hide the add item menu
function HideAddItemMenu(){
    var element = document.getElementById("addItemPopUp")
    element.style.display = "none"
}

// To fire the event case the body is clicked
function BodyClicked(){
    var modal = document.getElementById('addItemPopUp');
    // When the user clicks anywhere outside of the modal, close it
    modal.style.display = "none";  
}

// To add the required item 
function AddItem(){
    var itemsCB = document.getElementById("ItemsComboBox");
    console.log(document.getElementById("itemDetailFirstInput").value);

    switch (itemsCB.value) {
        case "img":
            AddImageToSlidder(document.getElementById("itemDetailFirstInput").value,document.getElementById("itemDetailSecondInput").value);
            break;
        case "post":
            AddImageToSlidder(document.getElementById("itemDetailFirstInput").value,document.getElementById("itemDetailSecondInput").value);
            break;
        case "nav-item":
            AddNavItem(document.getElementById("itemDetailFirstInput").value,document.getElementById("itemDetailSecondInput").value);
            break;
    
        default:
            break;
    }
    HideAddItemMenu();
}

// To fire the event case the selected item to add is chaged (within the combobox)
function SelectedAddItemChanged(){
    var itemsCB = document.getElementById("ItemsComboBox");

    var itemDetailFirst = document.getElementById("itemDetailFirst");
    var itemDetailSecond = document.getElementById("itemDetailSecond"); 

    var itemInputFirst = document.getElementById("itemDetailFirstInput");
    var itemInputSecond = document.getElementById("itemDetailSecondInput");

    switch (itemsCB.value) {
        case "img":
            itemDetailFirst.innerHTML = "Image name:";
            itemDetailSecond.innerHTML = "Image link:";
            itemInputFirst.placeholder  = "ex: myImage"
            itemInputSecond.placeholder = "ex: https://www.website.com"
            break;
        case "nav-item":
            itemDetailFirst.innerHTML = "Section title:";
            itemDetailSecond.innerHTML = "Section text:";
            itemInputFirst.placeholder  = "ex: Section"
            itemInputSecond.placeholder = "ex: bla bla bla"
            break;
    
        default:
            break;
    }
}

// ================ slide functions =========================
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex+=n);
}


function currentSlide(n) {
  showSlides(n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

//=========================================================

// To fire the event whrn a rate is entered by the user
function RatingClicked(e)
{
    var stars = document.getElementsByClassName("fa-star");
    for(var x=0; x < 5 ;x++){
        stars[x].className = "fa fa-star fa-3x ratingStar";
    }
    var numStar =  parseInt(e.target.id);
    for(var x=0; x < 6-numStar ;x++){
        stars[x].className = "fa fa-star fa-3x ratingStarChecked";
    }
    ratingResArr[numStar-1]+=1;   
    UpdateRatingResults();
}

// To add the user comment once the send button is clicked
function AddUserComment(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var subject = document.getElementById("subject").value;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '.' + dd + '.' + yyyy;

    var comment =   {
        writername: fname+ " " + lname,
        date: today,
        topic: subject
    }

    AddASingleCooment(comment);

}

//==============================================================
// ================= Helper Functions ==========================
//==============================================================


// firing the required function on loading
window.onload = function() {
    GenerateCommentsList();
    GenerateRatingResultsList();
    UpdateAverageRatingValue();
};

// to dynamically generate the comments list to show
function GenerateCommentsList(){

    commentsArray.forEach(comment =>AddASingleCooment(comment));
}

// To add a single comment
function AddASingleCooment(commentObj){
    var cDiv = document.createElement("div");
    var newHeading= document.createElement("h3");
    newHeading.innerHTML = commentObj.writername;
    cDiv.appendChild(newHeading); 

    var newDate= document.createElement("h4");
    newDate.innerHTML = commentObj.date;
    cDiv.appendChild(newDate); 

    var newComment= document.createElement("h2");
    newComment.innerHTML = commentObj.topic;
    cDiv.appendChild(newComment); 

    var newLine= document.createElement("hr");
    cDiv.appendChild(newLine); 
    document.querySelector("#commentsSection").appendChild(cDiv); 
}

// to dynamically generate the rating list to show
function GenerateRatingResultsList()
{
    var arrSum = ratingResArr.reduce((a, b) => a + b, 0)
      
    for(var x in ratingResArr){
        
        var Div = document.createElement("div");
        Div.className = "side";
        var Div2 = document.createElement("div");
        Div2.innerHTML = (5-x) +" star"
        Div.appendChild(Div2);

        var Div3 = document.createElement("div");
        Div3.className = "middle";
        var Div4 = document.createElement("div");
        Div4.className = "bar-container";
        var Div5 = document.createElement("div");
        Div5.className = "bar-value";
        Div5.style.width = (ratingResArr[x]/arrSum) * 100 + "%";

        Div4.appendChild(Div5);
        Div3.appendChild(Div4);

        var Div6 = document.createElement("div");
        Div6.className = "side right";
        var Div7 = document.createElement("div");
        Div7.innerHTML = ratingResArr[x] +" star"
        Div6.appendChild(Div7);

        document.querySelector("#ratingResults").appendChild(Div); 
        document.querySelector("#ratingResults").appendChild(Div3); 
        document.querySelector("#ratingResults").appendChild(Div6); 
    }
}

// to dynamically update the rating values case the user enter a rate
function UpdateRatingResults(){
    var arrSum = ratingResArr.reduce((a, b) => a + b, 0)

    var elements = document.getElementsByClassName("bar-value");
    var elements2 = document.getElementsByClassName("side right");
    for(var x=0; x < 5 ;x++){
        elements[x].style.width = (ratingResArr[x]/arrSum) * 100 + "%";
        elements2[x].innerHTML = ratingResArr[x] +" star";
    }
    UpdateAverageRatingValue();
}

// to dynamically update the average rating values case the user enter a rate
function UpdateAverageRatingValue(){
    var arrSum = ratingResArr.reduce((a, b) => a + b, 0)
    var av = ((ratingResArr[0]*5 + ratingResArr[1]*4 + ratingResArr[2]*3 + ratingResArr[3]*2 + ratingResArr[4]) / (arrSum*5)) * 5;
    document.querySelector("#ratingAvr").innerHTML = av.toFixed(2);
}

// to add an user-defined image to the slider within the home section 
// requires a link 
function AddImageToSlidder(name, link){
    var modal = document.getElementById('imageSlidder');
    modal.innerHTML += " <div class=\"mySlides fade\"><img src=\"  "+link+ " \" class=\"SliderImg\"></div> "
}

// to to add a new user-defined section 
// a new item with be added within the nav menu + the new section will
// be pushed at the end of the page (directly before the footer) 
function AddNavItem(title, text){;
    var newListItem= document.createElement("li");
    newListItem.innerHTML = "<a>"+ title+"</a>";
    document.querySelector("#headerItems").appendChild(newListItem);
    
    var newDiv= document.createElement("div");
    var newHeading= document.createElement("h1");
    newHeading.innerHTML = title;
    var newParagraph= document.createElement("p");
    newParagraph.innerHTML = text;
    newDiv.appendChild(newHeading)
    newDiv.appendChild(newParagraph)
    document.querySelector("#userAddedSections").appendChild(newDiv);  
}

