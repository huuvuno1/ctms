if (location.pathname.includes("/DangkyLoptinchi.aspx")) {
    let button = document.createElement('button');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let comfirm = confirm("CLick xong đợi nó load dữ liệu nhé, đừng click nhiều")
        if (confirm) {
            document.getElementById('leftcontent').innerHTML = "<img src='/images/ajaxbar.gif' alt='Đang tải dữ liệu' title='Đang tải dữ liệu' />"
            location.href="javascript:getSubcribleModule(); clearInterval(itv); void 0;";
        }
    })
    button.id = "nguyenhuuvu"
    button.innerText = "Lấy nhanh danh sách môn";
    document.querySelector("#topbackground").appendChild(button);
}



let s = document.createElement('script');
s.textContent = `
var tmp=0;
function subcrible(loptcID, sinhvienID, ct) {
    var args = "subcrible:" + loptcID+ ":" + sinhvienID;
    var context = 'dvLopChoDangky';
    tmp=sinhvienID;
    WebForm_DoCallback('ctl00$LeftCol$LoptinchiDangky1',args,hienLoptinchi,context,null,false);
    showWaiting(loptcID);
    //remove the same subject rows
    var trNodes = document.getElementsByTagName("tr");
    var i=0;
    while( i<trNodes.length){
        if (trNodes[i].title!=null && trNodes[i].title==("m"+ct)){
            trNodes[i].parentNode.removeChild(trNodes[i],true);
        }
        else 
            i++;
    }
}
function unSubcrible(loptcID, sinhvienID){
    var ans = confirm("Bạn có chắc chắn muốn huỷ đăng ký này?");
    if(!ans) return;
    var args = "unsubcrible:" + loptcID + ":" + sinhvienID;
    var context = 'dvLopChoDangky';
    tmp=sinhvienID;
    WebForm_DoCallback('ctl00$LeftCol$LoptinchiDangky1',args,hienLoptinchi,context,null,false);
    showWaiting(loptcID);
}
function hienLoptinchi(data, context){
    if (data.indexOf("Lỗi: ")>=0){
        alert(data);
        return;
    }
    var dv = document.getElementById(context);
    dv.innerHTML = data;
    if(context=='dvLopChoDangky')
        getLopVuaDangky();
}
function getLopVuaDangky(){
    var args = "list:" + tmp;
    var context='dvLopVuaDangky';
    WebForm_DoCallback('ctl00$LeftCol$LoptinchiDangky1',args,hienLoptinchi,context,null,false);
}
function showWaiting(lid){
    var obj = document.getElementById('a' + lid);
    var w = document.createElement('img');
    w.setAttribute("src","/images/ajax.gif");
    obj.parentNode.replaceChild(w, obj);
}
`
document.querySelector('body').appendChild(s)