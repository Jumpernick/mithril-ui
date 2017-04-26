var app = {
	view: function(){
		return m(".Mithril-UI.container-fluid", [
      m(MUI.MUI_flash, {
        position: "top"
      }),
      m("h1", "Mithril UI v0.1"),
      m("p", "Mithril UI, or MUI, is a set of reusable, predictible UI components for MithrilJS v1."),
      m("h2", "Buttons"),
      m(".row",[
        m(".col-lg-2.col-md-2.col-sm-3.col-xs-12", [
          m(MUI.MUI_button, {
            type: "sync",
            style: ["info"],
            icon: "fa-plus",
            title: "Add flash message",
            onclick: function(){
              MUI.MUI_flash.data.api.add({style: "success", title: "Hello", duration: 5000});
            },
            message: "Adds a Flash message."
          })
        ]),
        m(".col-lg-2.col-md-2.col-sm-3.col-xs-12", [
          m(MUI.MUI_button, {
            type: "dropdown",
            style: ["success", "rounded", "transparent"],
            title: "Options",
            items: [
              {
                title: "Add",
                icon: "fa-plus",
                onclick: function(){
                  MUI.MUI_flash.data.api.add({style: "info", title: "Hey", duration: 5000})
                }
              }
            ]
          })
        ])
      ]),
      m("h2", "Tooltip"),
      m("p", "Please add your unicorn.", [
        m(MUI.MUI_tooltip, {
          message: "I AM THE UNICORN."
        })
      ]),
      m("h2", "Flash messages"),
      m("p", "Mithril UI has a robust flash system."),
      m("p", "You can add it to your view wherever you want. But it most only be initialised once."),
      m(".row", [
        m(".col-lg-2.col-md-2.col-sm-3.col-xs-12", [
          m(MUI.MUI_button, {
            type: "sync",
            style: ["info"],
            title: "Add flash message",
            icon: "fa-plus",
            onclick: function(){
              MUI.MUI_flash.data.api.add({style: "info", title: "Hey", duration: 5000})
            }
          })
        ])
      ]),
      m("h2", "Lightbox"),
      m(".row", [
        // m(".col-lg-2.col-md-2.col-sm-3.col-xs-12", [
        //   m(MUI.MUI_lightbox),
        //   m(MUI.MUI_button, {
        //     type: "sync",
        //     style: ["info"],
        //     title: "Open lightbox",
        //     onclick: function(){
        //       MUI.MUI_lightbox.data.api.show();
        //     }
        //   })
        // ]),
        m(".col-lg-2.col-md-2.col-sm-3.col-xs-12", [
          m(MUI.MUI_lightbox_confirm, {
            title: "Do it?",
            buttonstyle: ["success"],
            callback: function(err){
              if (err) console.log("error")
              else console.log("It's happeninnnggg")
            }
          })
        ]),
        m(".col-lg-2.col-md-2.col-sm-3.col-xs-12", [
          m(MUI.MUI_lightbox_confirm, {
            title: "Do it?",
            buttonstyle: ["info"],
            callback: function(err){
              if (err) console.log("error")
              else console.log("It's happeninnnggg")
            }
          })
        ])
      ])
    ])
	}
}

var getStuff = function(callback){
  m.request({
    method: "GET",
    url: "http://localhost:3002/api/test"
  })
  .then(function(){
    callback();
  })
  .catch(function(e){
    callback(e.error);
  })
}

m.mount(document.getElementById("app"), app);