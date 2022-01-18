let count = 0;
const btn = document.querySelector('#btn');
btn.addEventListener('click', add_fieldset);
function add_fieldset(){

    let x = document.getElementById("form");

    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.innerHTML = "Package:";
    fieldset.appendChild(legend);

    let label1 = document.createElement("label");
    label1.innerHTML = "Height ";
    label1.setAttribute("for", `height${count+1}`);
    fieldset.appendChild(label1);

    let input1 = document.createElement("input");
    input1.setAttribute("type", 'number');
    input1.setAttribute("id", `height${count+1}`);
    input1.setAttribute("name", `height${count+1}`);
    fieldset.appendChild(input1);

    let label2 = document.createElement("label");
    label2.innerHTML = "Width ";
    label2.setAttribute("for", `width${count+1}`);
    fieldset.appendChild(label2);

    let input2 = document.createElement("input");
    input2.setAttribute("type", 'number');
    input2.setAttribute("id", `width${count+1}`);
    input2.setAttribute("name", `width${count+1}`);
    fieldset.appendChild(input2);

    let label3 = document.createElement("label");
    label3.innerHTML = "Length ";
    label3.setAttribute("for", `length${count+1}`);
    fieldset.appendChild(label3);

    let input3 = document.createElement("input");
    input3.setAttribute("type", 'number');
    input3.setAttribute("id", `length${count+1}`);
    input3.setAttribute("name", `length${count+1}`);
    fieldset.appendChild(input3);

    let label4 = document.createElement("label");
    label4.innerHTML = "Weight ";
    label4.setAttribute("for", `weight${count+1}`);
    fieldset.appendChild(label4);

    let input4 = document.createElement("input");
    input4.setAttribute("type", 'number');
    input4.setAttribute("id", `weight${count+1}`);
    input4.setAttribute("name", `weight${count+1}`);
    fieldset.appendChild(input4);

    let pos = x.childElementCount;

    x.insertBefore(fieldset, x.childNodes[pos]);

    count++;

    
}