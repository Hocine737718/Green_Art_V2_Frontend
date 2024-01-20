import axios from 'axios';
export function loadImage(rep, file) {
    let img=require(`@/assets/img/${rep}/none.png`);
    if(file!=null)
    {
      try {
        
        img=require(`@/assets/img/${rep}/${file}`);
      } 
      catch (error) {
        console.log(`@/assets/img/${rep}/${file}`);
        console.log("error loadImage");
        //console.error(error);
      }
    }
    return img;
}

export function prixDA(prix) {
    return prix.toString() + ".00 DA";
}

export async function useAxios(dataLabel,dataContent,serverUrl){
  
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