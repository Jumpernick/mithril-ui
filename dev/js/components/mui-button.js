MUI.MUI_button = {
  view: function(vnode){
    switch(vnode.attrs.type){
      case "sync":
        return m(MUI.MUI_button_types.sync, vnode.attrs)
      case "async":
        return m(MUI.MUI_button_types.async, vnode.attrs)
      case "dropdown":
        return m(MUI.MUI_button_types.dropdown, vnode.attrs)
      default:
        return m(MUI.MUI_button_types.sync, vnode.attrs)
    }
  }
}

MUI.MUI_button_types = {
  sync: {
    // m(MUI_button, {
    //   type: "sync",
    //   style: ["success", "transparent"],
    //   icon: "fa-caret-left",
    //   title: "Hello world",
    //   onclick: function(){
    //     console.log("hello")
    //   }
    // })
    view: function(vnode){
      return m("button",
        {
          class: [
            "mui-btn",
            vnode.attrs.style.map(function(style){
              return `mui-btn-${style}`
            }).join(" ")
          ].join(" "),
          onclick: vnode.attrs.onclick,
          "data-tooltip": vnode.attrs.message ? vnode.attrs.message : undefined,
          oncreate: vnode.attrs.oncreate ? vnode.attrs.oncreate : undefined
        }, 
        [
          m(`.fa.${vnode.attrs.icon}.fa-fw`)
        ],
        vnode.attrs.title
      )
    }
  },
  async: {
    // m(MUI_button, {
    //   type: "async",
    //   style: ["success", "transparent"],
    //   icon: "fa-caret-left",
    //   title: "Hello world",
    //   action: function(callback){
    //     console.log("hello")
    //     callback()
    //   },
    //   callback: function(err){
    //      if (!err) console.log("success")
    //   }
    // })
    oninit: function(vnode){
      vnode.state.data = {
        spinner: 0
      }
    },
    view: function(vnode){
      return m("div", 
        {
          class: [
            "mui-btn",
            vnode.attrs.style.map(function(style){
              return `mui-btn-${style}`
            }).join(" "),
            vnode.state.data.spinner ? "disabled" : ""
          ].join(" "),
          onclick: function(){
            if (vnode.state.data.spinner) return
            else {
              vnode.state.data.spinner = 1;
            }
            vnode.attrs.action(function(err){
              vnode.state.data.spinner = 0;
              if (err) {
                vnode.attrs.callback(err)
                return
              }
              vnode.attrs.callback()
            });
          },
          "data-tooltip": vnode.attrs.message ? vnode.attrs.message : undefined
        }, 
        [
          vnode.state.data.spinner ? m("i.fa.fa-fw.fa-circle-o-notch.fa-spin") : m(`.fa.${vnode.attrs.icon}.fa-fw`)
        ],
        vnode.state.data.spinner ? "" : vnode.attrs.title
      )
    }
  },
  dropdown: {
    // m(MUI.MUI_button, {
    //   type: "dropdown",
    //   style: ["success", "transparent"],
    //   title: "Hello world",
    //   items: [
    //    {
    //      title: "Add",
    //      icon: "fa-plus",
    //      onclick: function(){
    //         console.log("hello world")
    //       }
    //    }
    //   ]
    // })
    data: {
      visible: false,
      api: {},
      elements: {}
    },
    oncreate: function(vnode_parent){
      vnode_parent.state.data.api.clickHandle = function(e){
        if (
            e.target != vnode_parent.state.data.elements.dropdown && 
            e.target != vnode_parent.state.data.elements.button &&
            e.target != vnode_parent.state.data.elements.list
        ){
          vnode_parent.state.data.visible = false;
          window.removeEventListener("click", vnode_parent.state.data.api.clickHandle)
          m.redraw();
        }
      }
    },
    onremove: function(vnode_parent){
      window.removeEventListener("click", vnode_parent.state.data.api.clickHandle)
    },
    view: function(vnode_parent){
      return m(".mui-dropdown", {
        oncreate: function(vnode_dropdown){
          vnode_parent.state.data.elements.dropdown = vnode_dropdown.dom;
        }
      }, [
        m(MUI.MUI_button, {
          type: "sync",
          style: vnode_parent.attrs.style,
          icon: vnode_parent.state.data.visible ? "fa-caret-up" : "fa-caret-down",
          title: vnode_parent.attrs.title,
          onclick: function(){
            vnode_parent.state.data.visible = !vnode_parent.state.data.visible;
            if (vnode_parent.state.data.visible == true){
              window.addEventListener("click", vnode_parent.state.data.api.clickHandle)
            } else {
              window.removeEventListener("click", vnode_parent.state.data.api.clickHandle)
            }
          },
          oncreate: function(vnode_button){
            vnode_parent.state.data.elements.button = vnode_button.dom;
          }
        }),
        m("ul.mui-dropdown-list", {
          class: [
            vnode_parent.state.data.visible ? "active" : ""
          ].join(" "),
          oncreate: function(vnode_list){
            vnode_parent.state.data.elements.list = vnode_list.dom;
          }
        }, [
          vnode_parent.attrs.items.map(function(item){
            return m("li.mui-dropdown-list-item", {
              onclick: function(){
                item.onclick()
                vnode_parent.state.data.visible = false;
                window.removeEventListener("click", vnode_parent.state.data.api.clickHandle)
              }
            }, item.title, [
              m(`.fa.${item.icon}.fa-fw`)
            ])
          })
        ])
      ])
    }
  }
}