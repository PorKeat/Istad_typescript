function e(){let e=document.createElement("div");return e.innerHTML=`
    <a href="/products" data-link>ClickToProduct</a>
    <h1>HomePage</h1>
  `,e}function t(){let e=document.createElement("div");return e.innerHTML=`
    <h1>ProductPage</h1>
  `,e}function n(){let e=document.createElement("div");return e.innerHTML=`
    <h1>Page not found</h1>
  `,e}function r(){let e=document.createElement("div");return e.innerHTML=`
    <h1>DetailsPage</h1>
  `,e}function a(){let a;switch(window.location.pathname){case"/":a=e;break;case"/products":a=t;break;case"/details":a=r;break;default:a=n}var i=a;let c=document.getElementById("app");c.innerHTML="";let d=function(){let e=document.createElement("header");return e.className="bg-blue-900 text-white",e.innerHTML=`
    <h1>Header</h1>
  `,e}(),o=i(),u=function(){let e=document.createElement("footer");return e.className="bg-white dark:bg-gray-800 flex justify-center items-center w-full p-5",e.innerHTML=`
    <h1>Footer</h1>
  `,e}();c.append(d,o,u)}document.addEventListener("DOMContentLoaded",()=>{window.addEventListener("popstate",a),document.addEventListener("click",e=>{let t=e.target;if("A"===t.tagName&&t.hasAttribute("data-link")){e.preventDefault();let n=t.getAttribute("href");history.pushState(null,"",n),a()}}),a()});
//# sourceMappingURL=typescript.7b8dcf73.js.map
