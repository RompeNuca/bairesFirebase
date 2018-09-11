$(document).ready(function() {


    //LAZY IMAGENES
    $("img.lazy").lazyload();


////////////////////////////////////////////////////////////////////////////////

//FUNCION DE CARGA DE DATA POR GET
let request = obj => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach(key => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  });
};

var tradicionalData, digitalData, videoData, packingData, mediosData

//LISTA EN ORDEN DE EVENTOS
request({
    url: "data/data2.json"
  })
  .then(data => {
    var proyectos = JSON.parse(data);

    var esTradicional = function(e) {
      return e.categoria == 'tradicional'
    }
    var esDigital = function(e) {
      return e.categoria == 'digital'
    }
    var esVideo = function(e) {
      return e.categoria == 'video'
    }
    var espacking = function(e) {
      return e.categoria == 'packaging'
    }
    var esMedios = function(e) {
      return e.categoria == 'medios'
    }

    tradicionalData = proyectos.filter(esTradicional)
    digitalData = proyectos.filter(esDigital)
    videoData = proyectos.filter(esVideo)
    packingData = proyectos.filter(espacking)
    mediosData = proyectos.filter(esMedios)
  })

  .then(proyectos => {

      document.getElementById("sub-section-04-a").innerHTML += masHTML(digitalData)
      document.getElementById("sub-section-04-a").innerHTML += masHTML(tradicionalData)
      document.getElementById("sub-section-04-a").innerHTML += masHTML(videoData)
      document.getElementById("sub-section-04-a").innerHTML += masHTML(packingData)
      document.getElementById("sub-section-04-a").innerHTML += masHTML(mediosData)

  })

  .then(sliders => {

    $('.slider-01').owlCarousel({
      loop: false,
      dots: true,
      items: 1,
      nav: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: false,
      autoplayTimeout: 10000,
      autoplayHoverPause: false,
    });

    $('.slider-02').owlCarousel({
      lazyLoad: true,
      loop: true,
      dots: true,
      nav: true,
      navText: ['', ''],
      navClass: ['prev btn-t2', 'next btn-t2'],
      items: 1,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: false,
      autoplayTimeout: 10000,
      autoplayHoverPause: false,
    });

    $('.slider-03').owlCarousel({
      items: 1,
      loop: false,
      dots: true,
      nav: true,
      navText: ['', ''],
      navClass: ['prev btn-t2', 'next btn-t2'],
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: false,
      autoplayTimeout: 10000,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items: 2,
          responsiveClass: true
        },
        768: {
          items: 3
        }
      }
    });

    $('.slider-04').owlCarousel({
      items: 1,
      loop: true,
      dots: false,
      nav: false,
      autoplay: true,
      autoplayTimeout: 10000,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items: 2,
          responsiveClass: true
        },
        768: {
          items: 4
        },
        1280: {
          items: 6
        }
      }
    });
  })

  .then(funciones => {

    //CAMBIO FOTOS TRABAJOS
    $(".btn").mouseover(function() {
      var boton = $(this).data('bg');
      var proyecto = "#i" + boton;

      $(".pro").addClass("off");
      setTimeout(function() {
        $(".pro").removeClass("on");
        $(proyecto).addClass("on");
      }, 300);
      $(proyecto).removeClass("off");
    });

    //ACTIVA SECCION TRABAJOS
    $(".act").click(function() {
      var boton = $(this).data('bg');
      var proyecto = "#" + boton;

      $(".proyectos").addClass("on").removeClass("off");
      $(".slider-02").removeClass("off");
      $(".cubo-proyecto").removeClass("on");
      setTimeout(function() {
        $(proyecto).addClass("on").removeClass("off");
      }, 300);
      setTimeout(function() {
        $(".slider-02").addClass("on");
      }, 600);
    });

    //CAMBIAR DESCRIPCIONES
    $(".slider-02 .next, .slider-02 .prev, .slider-02 .dot").click(function() {
      var rr = "#" + $(this).parents('.cubo-proyecto').attr("id");
      var ee = rr + " .cubo-info .des"
      var dd = $(ee)
      var gg = rr + " .slider-02 .active > .slide-box"
      var nn = $(gg).data('bg');
      var mm = $(".cubo-info .des#" + nn)
      var zz = mm.attr("id")

      dd.removeClass("on")
      mm.addClass("on")

    });

    //CERRAR TRABAJOS
    $(".cerrar").click(function() {
      $(".slider-02").addClass("off").removeClass("on");
      setTimeout(function() {
        $("#d01").addClass("off");
      }, 300);
      setTimeout(function() {
        $("#d01").removeClass("on");
        $(".proyectos").addClass("off");
      }, 600);
      setTimeout(function() {
        $(".proyectos").removeClass("on");
      }, 900);

      $('.vv').each(function(){
        this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
      });
    });

    $(".masInfo").click(function() {
      if ($(this).hasClass("active")) {
        $('.masInfo').removeClass("rot")
        $(".cubo-info .on .parrafo-04").addClass("offb")
        setTimeout(function() {
          $(".cubo-info .on .parrafo-04").removeClass("onb");
        }, 300);
        $(this).removeClass("active");
      } else {
        $('.masInfo').addClass("rot")
        $(".cubo-info .on .parrafo-04").addClass("onb")
        setTimeout(function() {
          $(".cubo-info .on .parrafo-04").removeClass("offb");
        }, 300);
        $(this).addClass("active");
      }
    });

    //MENU
    $(".hamburguesa, .nav-item").click(function() {
      if ($(".hamb-01").hasClass("hamb-01-close")) {
        $(".hamb-01").removeClass("hamb-01-close").addClass("hamb-01-open");
      } else {
        $(".hamb-01").removeClass("hamb-01-open").addClass("hamb-01-close");
      }
      if ($(".hamb-02").hasClass("hamb-02-close")) {
        $(".hamb-02").removeClass("hamb-02-close").addClass("hamb-02-open");
      } else {
        $(".hamb-02").removeClass("hamb-02-open").addClass("hamb-02-close");
      }
      if ($(".hamb-03").hasClass("hamb-03-close")) {
        $(".hamb-03").removeClass("hamb-03-close").addClass("hamb-03-open");
      } else {
        $(".hamb-03").removeClass("hamb-03-open").addClass("hamb-03-close");
      }
      if ($(".nav-box").hasClass("on2")) {
        $(".nav-box, .nav-fondo-01, .nav-fondo-02").addClass("off2");
        setTimeout(function() {
          $(".nav-box, .nav-fondo-01, .nav-fondo-02, nav").removeClass("on2");
        }, 150);
      } else {
        $(".nav-box, .nav-fondo-01, .nav-fondo-02, nav").removeClass("off2").addClass("on2");
        setTimeout(function() {
          $("nav").addClass("on2");
        }, 600);
      }
      $(".on2").click(function() {
        $(".nav-box, .nav-fondo-01, .nav-fondo-02").addClass("off2");
        setTimeout(function() {
          $(".nav-box, .nav-fondo-01, .nav-fondo-02, nav").removeClass("on2");
        }, 150);
        $(".hamb-01").removeClass("hamb-01-close").addClass("hamb-01-open");
        $(".hamb-02").removeClass("hamb-02-close").addClass("hamb-02-open");
        $(".hamb-03").removeClass("hamb-03-close").addClass("hamb-03-open");
      });
    });


    //CARGA DE LA P
    $(window).on('scroll', function() {
      var pantalla = $(window).height();
      if ($(window).scrollTop() < (pantalla * 1)) {
        $(".hamb-01, .hamb-02, .hamb-03").removeClass('hamb-color');
        $('.relleno').height(0);
      }
      if ($(window).scrollTop() > (pantalla * 1 - 40)) {
        $(".hamb-01, .hamb-02, .hamb-03").addClass('hamb-color');
        $('.relleno').height(8);
      }
      if ($(window).scrollTop() > (pantalla * 2 - 40)) {
        $(".hamb-01, .hamb-02, .hamb-03").removeClass('hamb-color');
        $('.relleno').height(16);
      }
      if ($(window).scrollTop() > (pantalla * 3 - 40)) {
        $(".hamb-01, .hamb-02, .hamb-03").addClass('hamb-color');
        $('.relleno').height(24);
      }
      if ($(window).scrollTop() > (pantalla * 4 - 40)) {
        $(".hamb-01, .hamb-02, .hamb-03").removeClass('hamb-color');
        $('.relleno').height(32);
      }
      if ($(window).scrollTop() > (pantalla * 5 - 40)) {
        $(".hamb-01, .hamb-02, .hamb-03").addClass('hamb-color');
        $('.relleno').height(40);
      }
    });
  })

  .catch(error => {
    console.log(error);
  });





function proHTML(info) {
  var lego = '';
  for (var e in info) {
    lego += `
              <div class="tarjeta-cont">
                <div class="tarjeta-info">
                  <div class="trabajo"><h2>${info[e].categoria}</h2></div>
                  <button data-bg="${info[e].id}" class="btn-t2 act" type="button" name="button"> Ver Mas</button>
                </div>
                <div class="foto">
                  <img src="img/trabajos/${info[e].imgp}.jpg" alt="">
                </div>
              </div>
                    `
  }
  return lego;
}

function masHTML(info) {
  var lego = '';
  var c = '';
  for (var e in info) {

    lego += `
            <div id="${info[e].id}" class="cubo-proyecto">
              <div class="cubo-produccion">
                <div class="slider-02 slider-box">`
    for (var i in info[e].trabajos) {
      for (var v in info[e].trabajos[i].img) {

        lego += `
                        <div class="slide-box" data-bg="${info[e].trabajos[i].id}">
                          <div class="foto">`
        if (info[e].categoria == "video" || info[e].trabajos[i].tipo == "vid") {
          lego += `
                      <iframe class="vv" src="https://www.youtube.com/embed/${info[e].trabajos[i].img[v]}?enablejsapi=1&version=3&playerapiid=ytplayer" frameborder="0" allowfullscreen></iframe>
                  </div>
                </div>`
          // videos.push(info[e].trabajos[i].img[v]);
        } else {
          lego += `
                    <img class="owl-lazy imgMov" data-src="img/trabajos/${info[e].trabajos[i].img[v]}-720X1280.jpg" alt="">
                    <img class="owl-lazy imgDes" data-src="img/trabajos/${info[e].trabajos[i].img[v]}-1280X720.jpg" alt="">
                  </div>
                </div>`
        }

      }
    }
    lego += `
        </div>
      </div>
      <div class="cubo-info">
        <div class="cerrar">
        </div>
        <div class="masInfo btn-m">
        </div>`

    for (var i in info[e].trabajos) {
      if (c > 0) {
        lego += `
                <div class="des" id="${info[e].trabajos[i].id}">
                  <div class="titulo-03">
                    <h3>${info[e].trabajos[i].titulo} <br> <strong>${info[e].trabajos[i].cliente}</strong></h3>
                  </div>
                  <div class="parrafo-04 color-ter offb">
                    <p>${info[e].trabajos[i].descripcion}</p>`
      if (info[e].trabajos[i].link) {
        lego += `   <br>
                    <a class="btn-t4" target="_blank" href="http://${info[e].trabajos[i].link}">Ver +</a>`
      }
        lego +=`
                  </div>
                </div>
                `
      } else {
        lego += `
                <div class="des on" id="${info[e].trabajos[i].id}">
                  <div class="titulo-03">
                    <h3>${info[e].trabajos[i].titulo} <br> <strong>${info[e].trabajos[i].cliente}</strong></h3>
                  </div>
                  <div class="parrafo-04 color-ter offb">
                    <p>${info[e].trabajos[i].descripcion}</p>
                  </div>
                </div>
                `
        c++;
      }
    }
    lego += `
        <div class="line"></div>
      </div>
    </div>`
  }
  return lego;
}

});
