let sqls = {};
sqls["list"] = `
    select id, code, name, platform, min_version as minVersion, max_version as maxVersion, js, date_format(create_time, '%Y-%m-%d %H:%i:%s') as createTime
    from t_interface
    where flag = 0
    and id like ?
    and platform like ?
    and code like ?
    and name like ?
    and min_version >= ?
    and max_version <= ?
    order by id;
`;
sqls["insert"] = `
    insert t_interface(code, name, platform, min_version, max_version, js, create_time, flag)
    values(?, ?, ?, ?, ?, ?, now(), 0);
`;
sqls["update"] = `
    update t_interface
    set code = ?,
    name = ?,
    platform = ?,
    min_version = ?,
    max_version = ?,
    js = ?,
    update_time = now()
    where id = ?;
`;
sqls["load"] = `
    select id, code, name, platform, min_version as minVersion, max_version as maxVersion,
    js, create_time as createTime, update_time as updateTime, flag
    from t_interface
    where id = ?;
`;
sqls["remove"] = `
    update t_interface
    set flag = 1
    where id = ?;
`;
module.exports = sqls;