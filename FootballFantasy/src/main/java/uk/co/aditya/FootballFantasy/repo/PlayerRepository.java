package uk.co.aditya.FootballFantasy.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.co.aditya.FootballFantasy.player.Player;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {

    void deleteByName(String playerName);

    Optional<Player> findByName(String playerName);
}
