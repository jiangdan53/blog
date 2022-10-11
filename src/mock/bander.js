import Mock from "mockjs";

Mock.mock("/api/banner", "get", {
  code: 0,
  msg: "",
  data: [
    {
      id: "2",
      bigImg: require('@/assets/img/home.jpg'),
      title: "丹丹说前端",
      description: "前路荆棘，后路不平，勤学苦练，方得始终",
      motto:'前路漫漫，唯剑作伴'
    },
    {
      id: "1",
      bigImg:require('@/assets/img/home3.jpg'),
      title: "丹丹说前端",
      description: "人唯有恐惧的时候方能勇敢,战胜他恐据得最好办法就是一往无前",
      motto:'无畏无惧，砥砺前行'
    },
    {
      id: "3",
      bigImg: require('@/assets/img/home5.jpg'),
      title: "丹丹前端说",
      description: "固步自封非人之过，堕落不前乃人之弃",
      motto:'圣贤有过，自改不悔'
    },
  ],
});