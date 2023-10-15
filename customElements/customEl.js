function subtractTimes(time1,time2){}
class circle extends HTMLElement{
    constructor(){super();}
    connectedCallback(){
        const shadow=this.attachShadow({mode:"open"});
        const shape=document.createElement("div");
        const style=document.createElement("style");
        let width=10;
        let height=10;
        let color="#FFFFFF";
        if(this.hasAttribute("width"))
            width=this.getAttribute("width");
        if(this.hasAttribute("height"))
            height=this.getAttribute("height");
        if(this.hasAttribute("color"))
            color=this.getAttribute("color");
        style.textContent=`
        circle{
            width:${width}px;
            height:${height}px;
            
        }
        div{
            width:${width}px;
            height:${height}px;
            background-color:${color};
            border-radius:${width/2}px;
        }
        `
        shadow.append(style);
        shadow.append(shape);
    }
}
class Task extends HTMLElement{
    constructor(){super();}


    connectedCallback(){
        const shadow = this.attachShadow({ mode: "open" });
        this.setAttribute("class","task");
        const shape =document.createElement("div");
        shape.setAttribute("class","shape");

        const img= document.createElement("img");
        const taskshow=document.createElement("div");
        taskshow.setAttribute("class","taskpart");
        const taskName=document.createElement("h1");
        
        

        const inputs=[];

        const style=document.createElement("style");
        if(this.hasAttribute("subtasks"))
            inputs=this.getAttribute("subtasks").split("\\");
        for(let i=0;i<inputs.length;i++){
           const inputcheck= document.createElement("input");
            inputcheck.setAttribute("type","checkbox");
            inputcheck.setAttribute("id",`c${i}`);
            taskshow.append(inputcheck);
            const inputlabel=document.createElement("label");
            inputlabel.innerText(inputs[i]);
            inputlabel.setAttribute("for",`c${i}`);
            taskshow.append(inputlabel);

        }
        
        
        if(this.hasAttribute("imgsrc"))
            img.src=this.getAttribute("imgsrc");
        if(this.hasAttribute("title"))
            taskName.innerText=this.getAttribute("title");
            
        style.textContent=`
        .task{
            width:300px;
            height:200px;
            float: left;
        }
        
        .shape{
            margin: 10px;
            width:60px;
            height:200px;
            float: left;
            border-radius: 30px;
            background-color:lightblue;
            padding:5px;
            -webkit-box-sizing: border-box; 
             -moz-box-sizing: border-box;    
            box-sizing: border-box;      
        }
        .taskpart{
            float: left;
            font-family: Arial, Helvetica, sans-serif;
        }
        `
        shadow.append(style);
        shadow.append(shape);
        shadow.append(taskshow);
    }
}
customElements.define("task",Task);