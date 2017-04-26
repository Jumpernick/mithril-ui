MUI.MUI_lightbox = {
  data: {
    visible: false
  },
  oncreate: function(vnode){
    vnode.state.data.api = {
      show: function(){
        document.documentElement.classList.add('no-scroll')
        vnode.state.data.visible = true;
      },
      hide: function(){
        document.documentElement.classList.remove('no-scroll')
        vnode.state.data.visible = false;
      }
    }
  },
  view: function(vnode){
    return m("div", [
       m(MUI.MUI_button, {
        type: "sync",
        style: vnode.attrs.buttonstyle ? vnode.attrs.buttonstyle : ["success"],
        title: "Show confirm",
        onclick: function(){
          vnode.state.data.api.show();
        }
      }),
      m(".mui-lightbox", {
        class: [
          vnode.state.data.visible ? "active" : ""
        ],
        onclick: function(){
          vnode.state.data.api.hide();
          vnode.attrs.callback(1);
        }
      }, [
        m(".mui-lightbox-backdrop"),
        m(".mui-lightbox-lightbox", [
          m(".mui-lightbox-inner", [
            m(vnode.attrs.element)
          ])
        ])
      ])
    ])
  }
}

MUI.MUI_lightbox_confirm = {
  // m(MUI.MUI_lightbox_confirm, {
  //   title: "Do it?",
  //   buttonstyle: ["success"],
  //   callback: function(err){
  //     dostuff()
  //   }
  // })
  view: function(vnode_parent){
    return m("div", [
      m(MUI.MUI_lightbox, {
        buttonstyle: vnode_parent.attrs.buttonstyle,
        callback: vnode_parent.attrs.callback,
        element: {
          view: function(vnode){
            return m(".mui-lightbox-confirm", [
              m("h1", vnode_parent.attrs.title),
              m(".row", [
                m(".col-lg-6.col-md-6.col-sm-6.col-xs-6", [
                   m(MUI.MUI_button, {
                    type: "sync",
                    style: ["danger"],
                    icon: "fa-times",
                    title: "Cancel",
                    onclick: function(){
                      vnode_parent.attrs.callback(1)
                    }
                  })
                ]),
                m(".col-lg-6.col-md-6.col-sm-6.col-xs-6", [
                   m(MUI.MUI_button, {
                    type: "sync",
                    style: ["success"],
                    icon: "fa-check",
                    title: "Do it",
                    onclick: function(){
                      vnode_parent.attrs.callback()
                    }
                  })
                ])
              ])
            ])
          }
        }
      })
    ])
  }
}