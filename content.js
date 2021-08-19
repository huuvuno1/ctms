let ping;
let checkM;
let song = new Audio();
song.type= 'audio/mpeg';
song.src = "https://vnso-zn-16-tf-mp3-s1-m-zmp3.zadn.vn/ecf7d2b8b9fc50a209ed/8108595995793058283?authen=exp=1629561654~acl=/ecf7d2b8b9fc50a209ed/*~hmac=d1a28027df0ffcdfb730c3692b3128c0&fs=MTYyOTM4ODg1NDA1Mnx3ZWJWNnwxMDEyMTg4OTmUsIC3fDExMy4xNzUdUngMjI0LjIzMA&filename=Tieng-coi-bao-dong-Nhac-Chuong-Mien-Phi-Tieng-coi-bao-dong-dang-cap-nhat.mp3";

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
    document.querySelector("#topbackground").innerHTML += "<br>"
    document.querySelector("#topbackground").appendChild(button);

    let loadMon = document.createElement('button');
    loadMon.innerText = "Theo dõi tín";
    loadMon.addEventListener('click', async (e) => {
        e.preventDefault();
        if (loadMon.innerText == "Theo dõi tín") {
            loadMon.innerText = "Dừng chạy";
            ping = setInterval(() => {
                location.href="javascript:getSubcribleModule(); clearInterval(itv); void 0;";
            }, 10000);
            checkM = setInterval(() => {
                let imgs = document.querySelectorAll('td > a > img');
                if (imgs) {
                    imgs.forEach(img => {
                        if (img.src.includes('subcrible.png')) {
                            song.play()
                            return;
                        }
                    })
                }
            }, 5000)
        }
        else {
            loadMon.innerText = "Theo dõi tín";
            clearInterval(ping);
            clearInterval(checkM)
        }
    })
    loadMon.id = "treo"
    document.querySelector("#topbackground").appendChild(loadMon);
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



if (location.pathname.includes("KetquaHoctap.aspx")) { 
    let table = document.querySelector('#leftcontent > table.RowEffect.CenterElement');
    
    createFrame();
    calc();


    
}
function createTd(data, style) {
    return `<td style='${style}'>${data}</td>`
}
function ignore(tenMon) {
    let list = [
        "Kiến tập doanh nghiệp",
        "Thực hành",
        "Giáo dục quốc phòng",
        "Giáo dục thể chất",
        "Sinh hoạt"
    ]
    if (list.filter(w => tenMon.includes(w)).length == 0)
        return false;
    return true;
}

function calc() {
    let table = document.querySelector('#leftcontent > table.RowEffect.CenterElement');
   
    let trs = table.querySelectorAll('tbody > tr');
    let dGpa = 0;
    let sTc = 0;
    for (let tr of trs) {
        let tenMon = tr.querySelectorAll('td')[0].innerText;
        if (ignore(tenMon) || !tr.querySelector('input[type=checkbox]').checked) {
            tr.querySelectorAll('td')[10].innerText = 'Bỏ qua';
            tr.querySelectorAll('td')[10].style = 'color: red;'
            continue;
        }
        let d1 = tr.querySelectorAll('td')[4].innerText;
        let d2 = tr.querySelectorAll('td')[5].innerText;
        let d3 = tr.querySelectorAll('td')[6].innerText;
        let tc = tr.querySelectorAll('td')[1].innerText;
        d1 = parseFloat(d1);
        d2 = parseFloat(d2);
        tc = parseFloat(tc);
        if (d3 == '' || d3 == '?') {
            tr.querySelectorAll('td')[8].innerText = tr.querySelectorAll('td')[9].innerText = tr.querySelectorAll('td')[10].innerText = "?";
            tr.querySelectorAll('td')[8].style = tr.querySelectorAll('td')[9].style = tr.querySelectorAll('td')[10].style = "color: red;"
            continue;
        }
        console.log(d3, d3.split('|')[0].trim())
        d3 = d3.split('|')[0].trim();
        d3 = parseFloat(d3.replace('?', ''));
        let d10 = d1 * 0.1 + d2 * 0.2 + d3 * 0.7;
        let d4 = 0;
        let dc = '';
        if (d10 >= 9.5) { d4 = 4.0; dc = 'A+'; }
        else if (d10 >= 8.5) { d4 = 4.0; dc = 'A'; }
        else if (d10 >= 8) { d4 = 3.5; dc = 'B+'; }
        else if (d10 >= 7) { d4 = 3.0; dc = 'B'; }
        else if (d10 >= 6.5) { d4 = 2.5; dc = 'C+'; }
        else if (d10 >= 5.5) { d4 = 2.0; dc = 'C'; }
        else if (d10 >= 5) { d4 = 1.5; dc = 'D+'; }
        else if (d10 >= 4) { d4 = 1.0; dc = 'D'; }
        else { d4 = 0; dc = 'F'; }
        dGpa += d4 * tc;
        sTc += tc;
        tr.querySelectorAll('td')[8].innerText = d10.toFixed(2);
        tr.querySelectorAll('td')[9].innerText = d4.toFixed(2);
        tr.querySelectorAll('td')[10].innerText = dc;
        tr.querySelectorAll('td')[8].style = tr.querySelectorAll('td')[9].style = tr.querySelectorAll('td')[10].style = "color: black;"
    }
    if (dGpa) {
        document.querySelector('#gpaa').innerHTML = ' : ' + (dGpa/sTc).toFixed(1);
        document.querySelector('#sotin').innerHTML = ' : ' + sTc
    }
    else {
        document.querySelector('#sotin').innerHTML = ' : 0';
        document.querySelector('#gpaa').innerHTML = ' : 0';
    }
}

function createFrame() {
    let table = document.querySelector('#leftcontent > table.RowEffect.CenterElement');
    let th = createTd('Điếm hệ 10', 'font-weight: bold') + createTd('Điểm hệ 4', 'font-weight: bold') + createTd('Điểm chữ', 'font-weight: bold') + `<td class='none tick'>Bỏ chọn</td>`;
    table.querySelector('thead > tr').innerHTML += th;

    let trs = table.querySelectorAll('tbody > tr');
    trs.forEach(tr => {
        tr.innerHTML += createTd('', 'font-weight: bold') + createTd('', 'font-weight: bold') + createTd('', 'font-weight: bold') + `<td class='none' style='text-align: center;'><input type='checkbox' checked></td>`;
    })

    document.querySelector('#leftcontent > table.ThongtinSV > tbody').innerHTML += `<tr id='gpa'>
                                                                                        <td>GPA hiện tại</td><td id='gpaa'> : </td>
                                                                                        <td style="padding-left: 20px; ">Chế độ sửa điểm (Bạn có thể sửa điểm trong bảng)</td><td> : <input type="checkbox" id="edit" /> </td>
                                                                                    </tr>`;

    let newTr1 = document.createElement('tr');
    newTr1.innerHTML = `<tr>
                            <td style='font-weight: bold; color: green;'>Số tính chỉ tích lũy</td><td style='font-weight: bold; color: green;' id='sotin'></td>
                            <td style=""><i style=' color: red;'>(* Số tín này chưa bao gồm điểm đang chờ xác nhận nếu có)</i></td><td></td>
                        </tr>`;
    document.querySelector('#leftcontent > table.ThongtinSV > tbody').appendChild(newTr1) 

    let checkbox = document.getElementById("edit");
    let tick = document.querySelector('.tick');
    

    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            tick.classList.remove('none')
            let mtrs = table.querySelectorAll('#leftcontent > table.RowEffect.CenterElement > tbody > tr');
            mtrs.forEach(tr => {
                tr.querySelectorAll('td')[11].classList.remove('none')
            })
            table.contentEditable = true;
            let newTr = document.createElement('tr');
            newTr.innerHTML = `<tr>
                                    <td></td><td></td>
                                    <td style="padding-left: 20px"></td><td><button id='tinhDiem'>Tính lại điểm</button></td>
                                </tr>`;
            document.querySelector('#leftcontent > table.ThongtinSV > tbody').appendChild(newTr) 
            temp = table.querySelector('tbody').innerHTML;
            
            document.querySelector('#tinhDiem').addEventListener('click', (e) => {
                e.preventDefault();
                calc();
                document.querySelector('#gpa > td:nth-child(1)').innerHTML = "GPA được tính lại"
            })
        }
        else {
            table.contentEditable = false;
            document.querySelector('#leftcontent > table.ThongtinSV > tbody > tr:nth-child(7)').remove();
            table.querySelector('tbody').innerHTML = temp;
            document.querySelector('#gpa > td:nth-child(1)').innerHTML = "GPA hiện tại"
            calc();
            let mtrs = table.querySelectorAll('#leftcontent > table.RowEffect.CenterElement > tbody > tr');
            mtrs.forEach(tr => {
                tr.querySelectorAll('td')[11].classList.add('none')
            })
            tick.classList.add('none')
        }
    })

    tick.contentEditable = false
    tick.addEventListener('click', () => {
        let mtrs = table.querySelectorAll('#leftcontent > table.RowEffect.CenterElement > tbody > tr');
        
        if (tick.innerText == 'Bỏ chọn') {
            tick.innerText = 'Chọn hết';
            console.log('bo het')
            mtrs.forEach(tr => {
                tr.querySelectorAll('td')[11].querySelector('input').checked = false;
            })
        }
        else {
            tick.innerText = 'Bỏ chọn'
            console.log('chon het')

            mtrs.forEach(tr => {
                tr.querySelectorAll('td')[11].querySelector('input').checked = true;
            })
        }
    })
}

let temp = '';