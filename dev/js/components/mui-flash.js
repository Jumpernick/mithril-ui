MUI.MUI_flash = {
  data: {
    messages: {}
  },
  oninit: function(vnode){
    vnode.state.data.api = {
      getKeys: function(){
        return Object.keys(vnode.state.data.messages)
      },
      add: function(message){
        var index = vnode.state.data.api.getKeys().length + 1;
        vnode.state.data.messages[index] = {
          style: message.style,
          title: message.title,
          hidden: 0
        }
        setTimeout(function(){
          vnode.state.data.api.hide(index)
        }, message.duration)
        m.redraw();
      },
      hide: function(key){
        vnode.state.data.messages[key].hidden = 1;
        m.redraw();
      }
    }
  },
  view: function(vnode){
    if (vnode.state.data.api.getKeys().filter(function(key){
      if (vnode.state.data.messages[key]){
        if (!vnode.state.data.messages[key].hidden) return true
        else return false
      } else return false
    }).length == 0){
      vnode.state.data.messages = {};
    }
    return m(`.mui-flash.mui-flash-${vnode.attrs.position}`, [
      m(".inner", [
        vnode.state.data.api.getKeys().map(function(key){
          if (vnode.state.data.messages[key].hidden) return
          return m(MUI.MUI_flash_message, {
            title: vnode.state.data.messages[key].title,
            style: vnode.state.data.messages[key].style,
            hide: function(){
              vnode.state.data.api.hide(key);
            }
          })
        })
      ])
    ])
  }
}

MUI.MUI_flash_message = {
  onbeforeremove: function(vnode){
    vnode.dom.classList.add("fade-out")
    return new Promise(function(resolve) {
        setTimeout(resolve, 201)
    })
  },
  oncreate: function(vnode){
    setTimeout(function(){
      vnode.dom.classList.remove("fade-out")
    }, 100);
    return new Promise(function(resolve) {
        setTimeout(resolve, 201)
    })
  },
  view: function(vnode){
    return m(".mui-flash-message.fade-out", {
      class: vnode.attrs.style
    }, [
      m(".mui-flash-message-title", vnode.attrs.title),
      m(".mui-flash-message-hide", {
        onclick: function(){
          vnode.attrs.hide();
        }
      }, [
        m(".fa.fa-times.fa-fw")
      ])
    ])
  }
}