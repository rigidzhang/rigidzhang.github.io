var UI = {};
UI.appWidth = window.innerWidth > 600 ? 600 : window.innerWidth;
UI.appHeight = window.innerHeight;
const LETTERS = 22;
const baseFont = UI.appWidth / LETTERS; //通过更改body对象的字体大小，这个属性能够遗传其子子孙孙
document.body.style.fontSize = baseFont + "px"; //通过把body对象的宽度和高度设置为设备/屏幕的宽度和高度，实现全屏。
//通过CSS对子对象百分比（纵向）的配合，从而实现响应式设计的目标。
document.body.style.width = UI.appWidth + "px";
document.body.style.height = UI.appHeight - 1 * baseFont + "px";
UI.appHeight = window.innerHeight;
if (window.innerWidth < 1000) {
  $("aid").style.display = "none";
}
$("aid").style.width = window.innerWidth - UI.appWidth - baseFont * 3 + "px";
$("aid").style.height = UI.appHeight - baseFont * 1 + "px";

var Pointer = {};
Pointer.isDown = false;
Pointer.x = 0;
Pointer.deltaX = 0;
{
  let images = [
    "bitCoin.jpg",
    "canvas.jpg",
    "CS.jpg",
    "CSS.jpg",
    "cssAnimation.jpg",
    "CT.jpg",
    "Git.jpg",
    "gitForTeams.jpg",
    "GRE.jpg",
    "internet.jpg",
    "javaScript.jpg",
    "learnCSS.jpg",
    "linuxCMD.jpg",
    "logic.jpg",
    "NinjaJS.jpg",
    "nutrition.jpg",
    "STEM.jpg",
    "UML.jpg",
    "webProgramming.jpg",
  ]; // 图片数组
  let currentIndex = 0;

  function updateImage() {
    $("Content").style.backgroundImage = `url(images/${images[currentIndex]})`;
  }

  let handleBegin = function (ev) {
    Pointer.isDown = true;

    if (ev.touches) {
      Pointer.x = ev.touches[0].pageX;
      Pointer.y = ev.touches[0].pageY;
      console.log("Touch begin : " + "(" + Pointer.x + "," + Pointer.y + ")");
    } else {
      Pointer.x = ev.pageX;
      Pointer.y = ev.pageY;
      console.log(
        "PointerDown at x: " + "(" + Pointer.x + "," + Pointer.y + ")"
      );
    }
  };

  let handleEnd = function (ev) {
    Pointer.isDown = false;
    ev.preventDefault();

    if (ev.touches) {
      if (Math.abs(Pointer.deltaX) > 100) {
        if (Pointer.deltaX > 0) {
          currentIndex =
            currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        } else {
          currentIndex =
            currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        }
      }
    } else {
      if (Math.abs(Pointer.deltaX) > 100) {
        if (Pointer.deltaX > 0) {
          currentIndex =
            currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        } else {
          currentIndex =
            currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        }
      }
    }

    updateImage();
    $("Content").style.left = "auto"; // 重置滑动窗口位置
    Pointer.deltaX = 0; // 重置滑动距离
  };

  let handleMoving = function (ev) {
    ev.preventDefault();
    if (Pointer.isDown) {
      if (ev.touches) {
        Pointer.deltaX = parseInt(ev.touches[0].pageX - Pointer.x);
      } else {
        Pointer.deltaX = parseInt(ev.pageX - Pointer.x);
      }
      $("Content").style.left = Pointer.deltaX + "px";
    }
  };

  document.getElementById("Content").addEventListener("mousedown", handleBegin);
  document
    .getElementById("Content")
    .addEventListener("touchstart", handleBegin);
  document.getElementById("Content").addEventListener("mouseup", handleEnd);
  document.getElementById("Content").addEventListener("touchend", handleEnd);
  document.getElementById("Content").addEventListener("mouseout", handleEnd);
  document
    .getElementById("Content")
    .addEventListener("mousemove", handleMoving);
  document
    .getElementById("Content")
    .addEventListener("touchmove", handleMoving);

  // 初始化图片
  updateImage();

  // 按钮切换图片功能
  document.getElementById("nextImage").addEventListener("click", function () {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    updateImage();
  });

  // 按钮随机图片功能
  document.getElementById("randomImage").addEventListener("click", function () {
    currentIndex = Math.floor(Math.random() * images.length);
    updateImage();
  });

  // 按钮上一张图片功能
  document.getElementById("prevImage").addEventListener("click", function () {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    updateImage();
  });

  //提出问题：研究利用"keydown"和"keyup"2个底层事件，实现同时输出按键状态和文本内容
  $("body").addEventListener("keydown", function (ev) {
    let k = ev.key;
    let c = ev.keyCode;
    $("displayCode").textContent = "按下键 ：" + k + " ，" + "编码 ：" + c;
  });
  $("body").addEventListener("keyup", function (ev) {
    let k = ev.key;
    let c = ev.keyCode;
    $("displayCode").textContent = k + " 键已弹起" + "," + "编码" + c;
    /*判断键盘按下的是否为Enter键，如果是添p元素实现换行*/
    if (k === "Enter") {
      //有且只能在document中创建子节点
      let p = document.createElement("p");
      //通过创建p元素，添加子节点来实现换行。
      $("keyboard").appendChild(p);
    } else if (k === "Backspace") {
      /*没有字符可以删除了，则将该子节点删除*/
      if ($("keyboard").lastElementChild.textContent === "") {
        /*删除前保证keyboard中至少有一个字节点*/
        if ($("keyboard").childElementCount > 1) {
          $("keyboard").removeChild($("keyboard").lastElementChild);
        }
      } else {
        $("keyboard").lastElementChild.textContent = $(
          "keyboard"
        ).lastElementChild.textContent.slice(0, -1);
      }
    } else if (printLetter(k)) {
      $("keyboard").lastElementChild.textContent += k;
    }

    function printLetter(k) {
      if (k.length > 1) {
        //学生须研究这个逻辑的作用
        return false;
      }
      let puncs = [
        "~",
        "`",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "-",
        "_",
        "+",
        "=",
        ",",
        ".",
        ";",
        ";",
        "<",
        ">",
        "?",
        "/",
        " ",
        "'",
        '"',
      ];
      if (
        (k >= "a" && k <= "z") ||
        (k >= "A" && k <= "Z") ||
        (k >= "0" && k <= "9")
      ) {
        console.log("letters");
        return true;
      }
      for (let p of puncs) {
        if (p === k) {
          console.log("puncs");
          return true;
        }
      }
      return false;
      //提出更高阶的问题，如何处理连续空格和制表键tab？
    } //function printLetter(k)
  });
} //Code Block  End
function $(ele) {
  if (typeof ele !== "string") {
    throw "自定义的$函数参数的数据类型错误，实参必须是字符串！";
    return;
  }
  let dom = document.getElementById(ele);
  if (dom) {
    return dom;
  } else {
    dom = document.querySelector(ele);
    if (dom) {
      return dom;
    } else {
      throw "执行$函数未能在页面上获取任何元素，请自查问题！";
      return;
    }
  }
} //end of $