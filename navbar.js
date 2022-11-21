let steone = setTimeout(() => {
    if (localStorage.getItem("Cart_CHIC") == null) {
      localStorage.setItem("Cart_CHIC", JSON.stringify([]));
    }
    let new_username = window.location.href;
    console.log("new_username:", new_username);
  
    let name2 = new_username.split("=");
    console.log("name2:", name2);
  
    if (
      name2[1] != null &&
      name2[0] == ""
    ) {
      localStorage.setItem(
        "username_CHIC",
        JSON.stringify({ username: name2[1] })
      );
    }
  
    if (localStorage.getItem("username_CHIC") == null) {
      localStorage.setItem("username_CHIC", JSON.stringify({ username: null }));
    }
    let username = JSON.parse(localStorage.getItem("username_CHIC"));
    let name1 = username.username;
    if (name1 != null) {
      change_info();
    }
  
    function change_info() {
      let info = document.getElementById("navbar_info");
      info.innerHTML = null;
  
      let div1 = document.createElement("div");
      let p1 = document.createElement("p");
      p1.innerText = "Hi " + name1;
      div1.append(p1);
  
      let div2 = document.createElement("div");
      let p2 = document.createElement("p");
      p2.innerText = "My Account";
      div2.append(p2);
  
      let div3 = document.createElement("div");
      let p3 = document.createElement("p");
      p3.innerText = "Sign Out";
      p3.id = "sign_out_btn";
      div3.append(p3);
  
      let div4 = document.createElement("div");
      let p4 = document.createElement("p");
      p4.innerText = "Customer Care";
      div4.append(p4);
  
      info.append(div4, div3, div2, div1);
    }
  
    // to display the flying container on webpage and make background mask
    let mask = document.getElementById("layer_mask");
    let flycontainer = document.getElementById("flying_container");
    function displayNavContainer() {
      mask.style.visibility = "visible";
      flycontainer.style.visibility = "visible";
      mask.style.animationName = "animate1";
      mask.style.animationDuration = "0.6s";
    }
    function hideNavContainer() {
      mask.style.visibility = "hidden";
      flycontainer.style.visibility = "hidden";
      mask.style.animationName = "";
      mask.style.animationDuration = "";
    }
    let menu_options = document.getElementsByClassName("one");
    for (let i = 0; i < menu_options.length; i++) {
      menu_options[i].addEventListener("mouseenter", displayNavContainer);
      menu_options[i].addEventListener("mouseleave", hideNavContainer);
    }
    flycontainer.addEventListener("mouseenter", displayNavContainer);
    flycontainer.addEventListener("mouseleave", hideNavContainer);
  
    // to display the search results by default static
    let search_list = document.getElementById("search_list");
    let search = document.getElementById("search_box");
  
    function display_searchList() {
      search_list.style.visibility = "visible";
    }
    function hide_searchList() {
      search_list.style.visibility = "hidden";
    }
    search.addEventListener("click", display_searchList);
    search_list.addEventListener("mouseleave", hide_searchList);
  
    // to switch between the singin model /popup div
    let close = document.getElementById("close");
    let navbarSignIn = document.getElementById("navbar_signin_btn");
    let login_popup = document.getElementById("login_signup");
  
    function displaySigninPopup() {
      login_popup.style.visibility = "visible";
      mask.style.zIndex = 11;
      mask.style.visibility = "visible";
      mask.style.animationName = "animate1";
      mask.style.animationDuration = "0.6s";
    }
  
    function hideSigninPopup() {
      login_popup.style.visibility = "hidden";
      mask.style.zIndex = 9;
      mask.style.visibility = "hidden";
      mask.style.animationName = "";
      mask.style.animationDuration = "";
    }
    if (name1 == null) {
      navbarSignIn.addEventListener("click", displaySigninPopup);
    }
    close.addEventListener("click", hideSigninPopup);
  
    //display login form on click;
    let parent_div = document.getElementById("change_form");
    let popupLogin = document.getElementById("popup_login");
  
    function changeToLoginForm() {
      parent_div.innerHTML = null;
      let form = document.createElement("form");
      form.id = "form";
  
      let p1 = document.createElement("p");
      p1.innerText = "Email";
  
      let input1 = document.createElement("input");
      input1.id = "email";
      input1.type = "text";
  
      let p2 = document.createElement("p");
      p2.innerText = "Password";
  
      let input2 = document.createElement("input");
      input2.id = "password";
      input2.type = "password";
  
      let p3 = document.createElement("p");
      p3.id = "login_signup_alert";
  
      let div = document.createElement("div");
      let login_btn = document.createElement("button");
      login_btn.id = "login";
      login_btn.innerText = "Login";
  
      let p4 = document.createElement("p");
      p4.innerHTML = `Do not have an Account,<span id="popup_signup">Sign Up</span>`;
      p4.id = "login_disclamer";
  
      div.append(login_btn);
  
      form.append(p1, input1, p2, input2, p3, div, p4);
  
      parent_div.append(form);
  
      //login functionality
      let login_btn1 = document.getElementById("login");
      function login(e) {
        e.preventDefault();
        let form = document.getElementById("form");
        let alert_mes = document.getElementById("login_signup_alert");
        if (form.email.value == "") {
          alert_mes.innerText = "Please Enter Valid Email";
        } else if (form.password.value == "") {
          alert_mes.innerText = "Please Enter Password";
        } else {
          let user_data = {
            email: form.email.value,
            password: form.password.value,
          };
  
          let data_to_send = JSON.stringify(user_data);
          console.log("data_to_send:", data_to_send);
  
          fetch("/login", {
            method: "POST",
  
            body: data_to_send,
  
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log("res:", res);
  
              if (!res.error) {
                alert_mes.innerText = "Login Successful";
  
                let datastorage = JSON.parse(
                  localStorage.getItem("username_CHIC")
                );
                datastorage.username = res.user.username;
                localStorage.setItem(
                  "username_CHIC",
                  JSON.stringify(datastorage)
                );
                let timeout = setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                alert_mes.innerText = res.message;
              }
            })
            .catch((err) => {
              console.log("err:", err);
            });
        }
      }
      login_btn1.addEventListener("click", login);
  
      //change to signup functionlity
      let popupSignIn = document.getElementById("popup_signup");
      function changeToSignUpForm() {
        parent_div.innerHTML = null;
        parent_div.innerHTML = ` <form id="form">
                  <p>Name</p>
                  <input type="text" id="name">
          
                  <p>Email</p>
                  <input type="text" id="email">
  
                  <p>Username</p>
                  <input type="text" id="username">
          
                  <p>Password</p>
                  <input type="password" id="password">
          
                  <p>Mobile Number</p>
                  <input type="number" id="mobile">
                  <p id=login_signup_alert></p>
                  <div>
                      <button id="signup">Sign Up</button>
                  </div>
                  <p id="disclamer">By Signing In, I agree to <span>Terms and Conditions</span></p>
                  <p id="login_disclamer">Already have an account? <span id="popup_login">Login</span></p>  
              </form>`;
      }
      popupSignIn.addEventListener("click", changeToSignUpForm);
    }
    popupLogin.addEventListener("click", changeToLoginForm);
  
    //Sign up functionality
    let signup_btn = document.getElementById("signup");
    function signup(e) {
      e.preventDefault();
      let form = document.getElementById("form");
      let alert_mes = document.getElementById("login_signup_alert");
  
      if (form.name.value == "") {
        alert_mes.innerText = "Please Enter Name";
      } else if (form.email.value == "") {
        alert_mes.innerText = "Please Enter Email";
      } else if (form.username.value == "") {
        alert_mes.innerText = "Please Enter Valid Username";
      } else if (form.password.value == "") {
        alert_mes.innerText = "Please Enter Password";
      } else if (form.mobile.value.length < 10 || form.mobile.value.length > 10) {
        alert_mes.innerText = "Please Enter Valid Mobile No";
      } else {
        let user_data = {
          name: form.name.value,
          email: form.email.value,
          username: form.username.value,
          password: form.password.value,
          mobile: form.mobile.value,
        };
  
        user_data = JSON.stringify(user_data);
  
        fetch("/register", {
          method: "POST",
  
          body: user_data,
  
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
  
          .then((res) => {
            console.log("res:", res);
            alert_mes.innerText = res.message;
            if (!res.error) {
              let timeout = setTimeout(function () {
                changeToLoginForm();
              }, 2000);
            }
          })
          .catch((err) => {
            console.log("err:", err);
            alert("Login Sucessfull!");
          });
      }
    }
    signup_btn.addEventListener("click", signup);

  
  }, 500);