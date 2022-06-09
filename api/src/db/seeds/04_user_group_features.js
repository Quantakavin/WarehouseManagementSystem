/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  return knex('UserGroupFeature').del()
  .then(function () {
    return knex('UserGroupFeature').insert([
      {UserGroupID: 1, FeatureID: 1, FeatureRightID: 3},
      {UserGroupID: 1, FeatureID: 2, FeatureRightID: 3},
      {UserGroupID: 1, FeatureID: 3, FeatureRightID: 3},
      {UserGroupID: 1, FeatureID: 4, FeatureRightID: 1},
      {UserGroupID: 1, FeatureID: 5, FeatureRightID: 1},
      {UserGroupID: 1, FeatureID: 6, FeatureRightID: 1},
      {UserGroupID: 1, FeatureID: 7, FeatureRightID: 3},
      {UserGroupID: 1, FeatureID: 8, FeatureRightID: 2},
    ]);
  });
};
