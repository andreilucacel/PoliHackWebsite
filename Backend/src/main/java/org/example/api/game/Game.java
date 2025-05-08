package org.example.api.game;

import lombok.*;
import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "games")
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column
    private Integer userCount;

    @Column
    private String venue;

    @Column
    private String startDate;

    @Column
    private String day;

    @Column
    private String format;

    @Column
    private String level;
}
