let sqls = {};
sqls["info"] = `
    select count(1) as interfaceNumber from t_interface where flag = 0;
    select count(distinct platform) as platformNumber from t_interface where flag = 0;
`;
module.exports = sqls;