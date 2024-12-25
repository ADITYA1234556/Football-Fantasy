package uk.co.aditya.FootballFantasy.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uk.co.aditya.FootballFantasy.player.Player;
import uk.co.aditya.FootballFantasy.repo.PlayerRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers(){
        return playerRepository.findAll();
    }

    public List<Player> getPlayersByTeam(String teamName){
        return playerRepository.findAll().stream()
                .filter(player -> teamName.equals(player.getTeam_name()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String playerName){
        return playerRepository.findAll().stream()
                .filter(player -> player.getName().toLowerCase().contains(playerName.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayerByPosition(String playerPosition){
        return playerRepository.findAll().stream()
                .filter(player ->
                        player.getPosition() != null &&
                        player.getPosition().toLowerCase().contains(playerPosition.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByNationality(String nationality){
        return playerRepository.findAll().stream()
                .filter(player -> player.getNation().toLowerCase().contains(nationality.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPosition(String teamName, String position){
        return playerRepository.findAll().stream()
                .filter(player -> teamName.equals(player.getTeam_name()) && position.equals(player.getPosition()))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player){
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatePlayer){
        Optional<Player> existingPlayer = playerRepository.findByName(updatePlayer.getName());
        if (existingPlayer.isPresent()){
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setName(updatePlayer.getName());
            playerToUpdate.setPosition(updatePlayer.getPosition());
            playerToUpdate.setNation(updatePlayer.getNation());
            playerToUpdate.setTeam_name(updatePlayer.getTeam_name());

            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }

    @Transactional
    public void deletePlayer(String playerName){
        playerRepository.deleteByName(playerName);
    }
}
