package org.example.api.game;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class GameService {

    private final GameRepository gameRepository;

    public List<Game> getGames() {
        return gameRepository.findAll();
    }

    public List<Game> getGamesByCategory(String category) {
        List<Game> games = new ArrayList<>();
        for (Game game : getGames()) {
            if (game.getCategory().equalsIgnoreCase(category)) {
                games.add(game);
            }
        }
        return games;
    }

    public Game updateNumberUsers(Long id, int number) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));

        int updatedCount = game.getUserCount() + number;
        game.setUserCount(updatedCount);

        return gameRepository.save(game);

    }
}
