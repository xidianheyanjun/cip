let sqls = {};
sqls["load"] = `
    select js
    from t_interface
    where flag = 0
    and find_in_set(code, ?)
    and platform = ?
    and min_version <= ?
    and max_version >= ?;
`;
module.exports = sqls;