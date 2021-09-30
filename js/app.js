
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

// numbe of the sections that should be added to the nav-menu 
//let numOfLandingSections = document.getElementsByClassName("landingSection").length;
let numOfLandingSections = 0;

// array of html components contains the titles-input of the user-defined sections
let titels = {};
// array of html components contains the text-areas of the user-defined sections
let texts =  {};

// array of strings contains the titles of the ready sections 
let readyComponents = [ ];
// ============================================================================

window.addEventListener('resize', BodyResize);
//==============================================================
// ================= Functions for APIs ==========================
//==============================================================

function BodyResize(){
    let box = document.querySelector('#mainDiv');
    let header = document.querySelector('#headerItems');
    header.style.width = box.offsetWidth+"px";

    let imgs = document.querySelectorAll('.aboutUsImg');
    imgs[0].style.width = (box.offsetWidth/4)+"px";
    imgs[1].style.width = (box.offsetWidth/4)+"px";
}

// to randomize the titles and text of the sections -(mainly to test)
function RandomizeSectionDetails(){
    titels = document.getElementsByClassName("secTitle");
    texts = document.getElementsByClassName("secText");
    for(var i = 0; i < titels.length; i++)
    {
        titels[i].value = "Section"+ (i+1);

        texts[i].value =  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n"
                        + "Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti.\n"
                        + "Aenean aliquam elementum mi, ac euismod augue.\n" 
                        + "Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis.\n"
                        + "Sed convallis sollicitudin mauris ac tincidunt.\n"
                        + "Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue..\n"
                        + "\n"
                        + " Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam.\n"
                        + " porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod."
                        + "  Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor." 
                        + " Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non."
    }
    var button = document.getElementById("loadPageButton");
    button.scrollIntoView({behavior: 'smooth'});
}

// to set the main page parameters based on the user inputs
function SetPage(){
    var counter = 0;
    var numOfLandingSections = document.querySelector("#secNum").value;
    if (numOfLandingSections > 10)
    {
        window.alert("Plese enter a number less than 10");
        return;
    }

    var markedCheckbox = document.getElementsByClassName("checkBoxClass");

    for (var checkbox of markedCheckbox) 
    {
        if (checkbox.checked) {
            readyComponents.push(checkbox.value);
            counter++;
        } 
    }

    if (numOfLandingSections == 0 && counter == 0)
    {
        window.alert("You must have at least 1 component. Please enter a number or/and checked from our components. ");
        return;
    }

    document.querySelector("#optionSetDiv").style.display = "none";
    let detailsDiv = document.querySelector("#sectionsDetails");
    
    // looping over the chosen ready components
    for (let i = 0; i < readyComponents.length; i++)
    {
        var itemID = "#"+readyComponents[i];
        document.querySelector(itemID).style.display = "block";
    }

    // looping over the defined components
    for (let i = 0; i < numOfLandingSections; i++)
    {
        var cDiv = document.createElement("div");
        cDiv.className = "secDetail";
        var newHeading = document.createElement("h3");
        newHeading.innerHTML = "Section num " +(i+1)+ " title:";
        cDiv.appendChild(newHeading); 
        var newInput = document.createElement("input");
        newInput.setAttribute("type", "text");
        newInput.setAttribute("class", "secTitle");
        newInput.setAttribute("placeholder", "Write something..");
        cDiv.appendChild(newInput); 

        var newHeading2 = document.createElement("h3");
        newHeading2.innerHTML = "Section num " +(i+1)+ " text:";
        cDiv.appendChild(newHeading2); 
        var newTextArea = document.createElement("textarea");
        newTextArea.setAttribute("class", "secText");
        newTextArea.setAttribute("placeholder", "Write something..");
        cDiv.appendChild(newTextArea); 
        detailsDiv.appendChild(cDiv); 

    }

    var newSetButton = document.createElement("button");
    newSetButton.setAttribute("onclick", "ShowMainPageWithUserSetup()");
    newSetButton.setAttribute("id", "loadPageButton");
    newSetButton.innerHTML = "Load Page"
    detailsDiv.appendChild(newSetButton); 
    detailsDiv.style.display = "block";
}

// to show the main landing page
function ShowMainPageWithUserSetup()
{
    titels = document.getElementsByClassName("secTitle");
    texts = document.getElementsByClassName("secText");

    for(var i = 0; i < titels.length; i++)
    {
        if (titels[i].value == ""){
            window.alert("You have to set titles for all sections.");
            return;
        }
    }


    document.querySelector("#sectionsDetails").style.display = "none";
    var mainDiv = document.querySelector("#mainDiv");
    mainDiv.scrollIntoView({behavior: 'smooth'});

    // looping over the chosen ready components 
    for(var i = 0; i < readyComponents.length; i++)
    {
        var newListItem= document.createElement("li");
        newListItem.innerHTML = "<a>"+readyComponents[i] +"</a>";
        document.querySelector("#headerItems").appendChild(newListItem);
    }

    // looping over the defined components 
    for(var i = 0; i < titels.length; i++)
    {
        var newListItem= document.createElement("li");
        newListItem.innerHTML = "<a>"+ titels[i].value+"</a>";
        document.querySelector("#headerItems").appendChild(newListItem);
        var newDiv= document.createElement("div");
        newDiv.setAttribute("class","landingSectionUserDefined"); 
        newDiv.setAttribute("id", titels[i].value);
        var newHeading= document.createElement("h1");
        newHeading.innerHTML = titels[i].value;
        var newParagraph= document.createElement("p");
        var newBreak= document.createElement("br");
        var newBreak2= document.createElement("br");
        var newLine= document.createElement("hr");
        newParagraph.innerHTML = texts[i].value;
        newDiv.appendChild(newHeading);
        newDiv.appendChild(newParagraph);
        newDiv.appendChild(newBreak);
        newDiv.appendChild(newBreak2);
        newDiv.appendChild(newLine);
        document.querySelector("#userAddedSections").appendChild(newDiv); 
    } 
    mainDiv.style.display = "block";

    document.getElementById("floatingBtn").style.display = "block";
    document.getElementById("floatingBtnToTop").style.display = "block";
    BodyResize();
}

// function to change active class for nav item
function ChangeActiveState(e) 
{

    var els = document.getElementsByClassName("landingSectionActive");
    var elsNav = document.getElementsByClassName("active");
    if (els.length > 0){
        els[0].className = "landingSectionUserDefined";
        elsNav[0].className = "";
    }
    var elmnt = document.getElementById(e.target.innerHTML);
    elmnt.scrollIntoView({behavior: 'smooth'});
    elmnt.className = "landingSectionActive"
    e.target.className = "active";
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

// to scroll to the top
function GoToTop(){
    document.querySelector("#mainDiv").scrollIntoView({behavior:'smooth'});  
}