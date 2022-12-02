///
/// Dealing with cookies
///

// Setting the cookie
function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins*60*1000)); // Expires in x minutes
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
// Getting the cookie
function CookieCheck(a, b) {
    b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }
// banner yes
function cbaccept() {
    setCookie('cookieaccept', 'yes', 1)
    setCookie('_gid', 'http://googleads.g.doubleclick.net/2653675a06454543||t=1245534535|et=622|cs=054584ffd94jg4j496Cookie', 1)
    document.getElementById("cookiebanner").style.visibility = "hidden";
}
// banner necessary
function cbdeny() {
    setCookie('cookieaccept', 'necessary', 1)
    document.getElementById("cookiebanner").style.visibility = "hidden";
}
// banner display check
function bannercheck(){
    if (CookieCheck("cookieaccept") == "yes" || 
        CookieCheck("cookieaccept") == "necessary") { // do nothing?
    } else {
        document.getElementById("cookiebanner").style.visibility = "visible";
    }
}


///
/// Dealing with login state
///
// what to do when logging in
function login(){
    document.getElementById('loginbutton').style.display='none';
    document.getElementById('logoutbutton').style.display='block';
    //document.getElementById("pleaselogintext").style.display = 'none';
    //document.getElementById("purchasebutton").href = "/order";
    //document.getElementById("purchasebutton").classList.remove('nointeraction');
}
// on page load:
function pageinit(){
    if (CookieCheck("login") == "yes"){
        login()
    }
    // bannercheck() // separate for now
}

// logout button click
function logoutaction(){
    setCookie('login', 'no', 1)
    location.reload();
}


///
/// ID people
///
function saveid(){
    localStorage.setItem("part_id", window.location.search);
}
function openpagewithid(){
    let x = localStorage.getItem("part_id");
    window.location.replace("https://www.exampleshopb.com" + x);
}


// html files loading // php too hard
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = '/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})


// Execute on pageload
document.addEventListener("DOMContentLoaded", function() {
    bannercheck(); // check to see if banner needs to be displayed
    pageinit(); // check login state
 });