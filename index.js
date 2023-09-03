const WebSocketServer = require("ws").Server;

const server = new WebSocketServer({ port: 8080 });
let topic_uid = "";

server.on("connection", (ws) => {
  console.log("connection is on");

  ws.on("message", (data) => {
    let res = JSON.parse(data);

    if (res.action === "send-message") {
      if (res?.data?.topic_uid) {
        topic_uid = res.data.topic_uid;
      }
      console.log(topic_uid);
      console.log(res);
      ws.send(
        JSON.stringify({
          data: {
            is_read: 0,
            is_own: 0,
            chat_topic_name: "notify14",
            seqid: 8,
          },
          action: "receive-message",
        })
      );
    } else {
      console.log(res);
    }
  });
});
