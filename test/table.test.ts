import { expect } from 'chai'
import 'mocha'
import { Column, Table, Cell } from '../src/table'

describe('Table', function() {
  describe('addColumns', function() {
    it('should add columns', function() {
      let table = new Table
      
      table.addColumns(
        new Column('a'),
        new Column('b'),
      )

      expect(table.columns.length).to.equal(2)
      expect(table.columns[0].table).to.equal(table)
      expect(table.columns[0].name).to.equal('a')
      expect(table.columns[1].table).to.equal(table)
      expect(table.columns[1].name).to.equal('b')
    })

    it('should add column names', function() {
      let table = new Table
      
      table.addColumns('a', 'b')

      expect(table.columns.length).to.equal(2)
      expect(table.columns[0]).to.be.instanceOf(Column)
      expect(table.columns[0].table).to.equal(table)
      expect(table.columns[0].name).to.equal('a')
      expect(table.columns[1]).to.be.instanceOf(Column)
      expect(table.columns[1].table).to.equal(table)
      expect(table.columns[1].name).to.equal('b')

    })

    it('should add from anonymous column objects', function() {
      let table = new Table      
      
      table.addColumns(
        { name: 'a' },
        { name: 'b', title: 'B' }
      )

      expect(table.columns.length).to.equal(2)
      expect(table.columns[0]).to.be.instanceOf(Column)
      expect(table.columns[0].table).to.equal(table)
      expect(table.columns[0].name).to.equal('a')
      expect(table.columns[0].title).to.be.undefined
      expect(table.columns[1]).to.be.instanceOf(Column)
      expect(table.columns[1].table).to.equal(table)
      expect(table.columns[1].name).to.equal('b')
      expect(table.columns[1].title).to.equal('B')
    })

    it('should add a mixture of all parameter types', function() {
      let table = new Table      
      
      table.addColumns(
        'a',
        new Column('b', 'ObjectB'),
        { name: 'c', objectName: 'ObjectC', title: 'C' }
      )

      expect(table.columns.length).to.equal(3)
      expect(table.columns[0]).to.be.instanceOf(Column)
      expect(table.columns[0].table).to.equal(table)
      expect(table.columns[0].name).to.equal('a')
      expect(table.columns[0].title).to.be.undefined
      expect(table.columns[1]).to.be.instanceOf(Column)
      expect(table.columns[1].table).to.equal(table)
      expect(table.columns[1].name).to.equal('b')
      expect(table.columns[1].objectName).to.equal('ObjectB')
      expect(table.columns[2]).to.be.instanceOf(Column)
      expect(table.columns[2].table).to.equal(table)
      expect(table.columns[2].name).to.equal('c')
      expect(table.columns[2].objectName).to.equal('ObjectC')
      expect(table.columns[2].title).to.equal('C')
    })
  })

  describe('getColumn', function() {
    it('should get the column by name', function() {
      let table = new Table
      table.addColumns('a', 'aa', 'A')

      let column1 = table.getColumn('a')
      let column2 = table.getColumn('aa')
      let column3 = table.getColumn('A')

      expect(column1).to.not.be.undefined
      expect(column1?.name).to.equal('a')
      expect(column2).to.not.be.undefined
      expect(column2?.name).to.equal('aa')
      expect(column3).to.not.be.undefined
      expect(column3?.name).to.equal('A')
    })
  })

  describe('add', function() {
    it('should add arbitrary objects reading the properties according to the column names', function() {
      let table = new Table
      
      table.addColumns(
        new Column('a'),
        new Column('c'),
      )

      table.add(
        { a: 'a1', b: 'b1', c: 'c1', d: 'd1' },
        { a: 'a2', b: 'b2', c: 'c2', d: 'd2' }
      )

      expect(table.rows.length).to.equal(2)
      expect(table.rows[0].cells.length).to.equal(2)
      expect(table.rows[0].cells[0].value).to.equal('a1')
      expect(table.rows[0].cells[1].value).to.equal('c1')
      expect(table.rows[1].cells.length).to.equal(2)
      expect(table.rows[1].cells[0].value).to.equal('a2')
      expect(table.rows[1].cells[1].value).to.equal('c2')
    })

    it('should create cells from the given cell factory on a column object', function() {
      let table = new Table

      table.addColumns(
        new Column('a', (value) => new Cell(value + 'x'))
      )

      table.add({ a: 'a' })

      expect(table.rows[0].cells[0].value).to.equal('ax')
    })
  })
})