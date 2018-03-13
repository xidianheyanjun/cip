export default{
  box(context, box){
    box.isShow = !box.isHide;
    context.commit("box", box);
  }
};
