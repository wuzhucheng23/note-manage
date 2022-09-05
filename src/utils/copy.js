export const copy = (dom) => {
    const input = document.createElement('input');
    input.setAttribute("value", dom.innerText)
    document.body.appendChild(input)
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input)
}
