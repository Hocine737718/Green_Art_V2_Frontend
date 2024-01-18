import axios from 'axios';
import Swal from 'sweetalert2';
export function loadImage(rep, file) {
    let img=require(`@/assets/img/${rep}/none.png`);
    if(file!=null)
    {
      try {
        img=require(`@/assets/img/${rep}/${file}`);
      } 
      catch (error) {
        console.log("error loadImage");
        //console.error(error);
      }
    }
    return img;
}

export function prixDA(prix) {
    return prix.toString() + ".00 DA";
}

function setUpLoading(){
  var custom_loader=`
  <div class="loading"></div>
  `;
  axios.interceptors.request.use((config) => {
    Swal.fire({
      html: custom_loader,
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      Swal.close();
      return response;
    },
    (error) => {
      Swal.close();
      return Promise.reject(error);
    }
  );
}

export async function useAxios(dataLabel,dataContent,serverUrl){
  setUpLoading();
  const res={error:false,msg:"",content:null};
  try {
    const data = new FormData();
    data.append(dataLabel, dataContent);
    
    let response = await axios.post(serverUrl, data);
    
    if(response.data.success){
      res.msg=response.data.msg;
      res.data=response.data.content;
    } 
    else if(response.data.msg) throw new Error(response.data.msg);
    else throw new Error(response.data);
  } 
  catch (error) {
    res.error=true;
    res.msg=error || "Une erreur s'est produite.";
  }  
  return res;
}