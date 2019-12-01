module.exports = (sequelize, Sequelize) => {
	return sequelize.define('members', {
		userid: {
			type: Sequelize.STRING(16),
			allowNull: false,
			unique: true,
		},
		userpw: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		username: {
			type: Sequelize.STRING(255)
		}
	}, {
		timestamps: true
	});
}