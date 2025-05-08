package org.example.api.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage/{matchId}")
    public void sendMessage(@DestinationVariable String matchId, @Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSend("/topic/match/" + matchId, chatMessage);
    }

    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        if (chatMessage.getSender() == null || chatMessage.getMatchId() == null) {
            System.err.println("Missing sender or matchId in chatMessage: " + chatMessage);
            return;
        }

        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        messagingTemplate.convertAndSend(
                "/topic/match/" + chatMessage.getMatchId(),
                chatMessage
        );
    }

}
