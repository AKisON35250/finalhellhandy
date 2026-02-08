async function register(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/register",{
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({username,password})
  });

  const data = await res.json();
  if(data.success) alert("Registriert! Jetzt Login");
  else alert(data.message);
}

async function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login",{
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({username,password})
  });

  const data = await res.json();
  if(data.success){
    document.getElementById("lockscreen").style.display="none";
    document.getElementById("phoneUI").classList.remove("hidden");
    localStorage.setItem("userId", data.userId);
  } else {
    alert(data.message);
  }
}

