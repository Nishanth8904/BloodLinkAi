package com.bloodlink.repo;

import com.bloodlink.dto.Donor;
import com.bloodlink.dto.DonorLocationCountDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class MainRepository {

    private static final Logger logger = LoggerFactory.getLogger(MainRepository.class);

    // Centralized SQL queries for better readability and management
    private static final String FIND_ALL_DONORS_SQL = "SELECT id, name, blood_group, location, last_donation_date, phone, available FROM donors ORDER BY name ASC";
    private static final String FIND_DONOR_BY_ID_SQL = "SELECT * FROM donors WHERE id = ?";
    private static final String INSERT_DONOR_SQL = "INSERT INTO donors (id, name, blood_group, location, last_donation_date, phone, available) VALUES (?, ?, ?, ?, ?, ?, ?)";
    private static final String UPDATE_DONOR_SQL = "UPDATE donors SET name = ?, blood_group = ?, location = ?, last_donation_date = ?, phone = ?, available = ? WHERE id = ?";
    private static final String DELETE_DONOR_SQL = "DELETE FROM donors WHERE id = ?";
    private static final String COUNT_ALL_DONORS_SQL = "SELECT COUNT(*) FROM donors";
    private static final String GET_DONOR_COUNTS_BY_LOCATION_SQL = "SELECT location, COUNT(*) as count FROM donors GROUP BY location";

    private final JdbcTemplate jdbc;
    private final DonorMapper donorMapper = new DonorMapper();

    public MainRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // =================================================================
    // Donor Operations
    // =================================================================

    public List<Donor> findAllDonors() {
        return jdbc.query(FIND_ALL_DONORS_SQL, donorMapper);
    }

    public Donor findDonorById(String id) {
        try {
            return jdbc.queryForObject(FIND_DONOR_BY_ID_SQL, donorMapper, id);
        } catch (EmptyResultDataAccessException ex) {
            logger.warn("No donor found with ID: {}", id);
            return null;
        }
    }

    public int saveDonor(Donor donor) {
        return jdbc.update(INSERT_DONOR_SQL,
                donor.getId(),
                donor.getName(),
                donor.getBloodGroup(),
                donor.getLocation(),
                donor.getLastDonationDate(),
                donor.getPhone(),
                donor.getAvailable() != null ? donor.getAvailable() : true);
    }

    public int updateDonor(String id, Donor donor) {
        return jdbc.update(UPDATE_DONOR_SQL,
                donor.getName(),
                donor.getBloodGroup(),
                donor.getLocation(),
                donor.getLastDonationDate(),
                donor.getPhone(),
                donor.getAvailable() != null ? donor.getAvailable() : true,
                id);
    }

    public int deleteDonorById(String id) {
        return jdbc.update(DELETE_DONOR_SQL, id);
    }

    // =================================================================
    // Statistics & Map Operations
    // =================================================================

    public int getTotalDonors() {
        Integer count = jdbc.queryForObject(COUNT_ALL_DONORS_SQL, Integer.class);
        return (count != null) ? count : 0;
    }

    public List<DonorLocationCountDTO> getDonorCountsByLocation() {
        return jdbc.query(GET_DONOR_COUNTS_BY_LOCATION_SQL, (rs, rowNum) -> new DonorLocationCountDTO(
                rs.getString("location"),
                rs.getLong("count")
        ));
    }


    // =================================================================
    // Row Mapper Implementation
    // =================================================================

    private static class DonorMapper implements RowMapper<Donor> {
        @Override
        public Donor mapRow(ResultSet rs, int rowNum) throws SQLException {
            Donor donor = new Donor();
            // Corrected to read the ID as a String
            donor.setId(rs.getString("id"));
            donor.setName(rs.getString("name"));
            donor.setBloodGroup(rs.getString("blood_group"));
            donor.setLocation(rs.getString("location"));
            donor.setLastDonationDate(rs.getDate("last_donation_date"));
            donor.setPhone(rs.getString("phone"));
            donor.setAvailable(rs.getBoolean("available"));
            return donor;
        }
    }
}