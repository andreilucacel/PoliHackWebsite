package org.example.api.game;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/increase")
    public ResponseEntity<Game> increase(@RequestBody IncreaseRequest increaseRequest) {
        try {
            Game updatedGame = gameService.updateNumberUsers(increaseRequest.getId(), increaseRequest.getNumber());
            return ResponseEntity.ok(updatedGame);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/getall")
    public ResponseEntity<List<Game>> getAll() {
        try{
            List<Game> games = gameService.getGames();
            return ResponseEntity.ok().body(games);
        }catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getcategories")
    public ResponseEntity<List<Game>> getCategories(@RequestParam(required = false) String category) {
        try {
            List<Game> games = gameService.getGamesByCategory(category);
            return ResponseEntity.ok().body(games);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
