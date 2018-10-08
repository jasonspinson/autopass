describe('待辦事項測試', function() {
    it('內容連線是否成功', function() {
      cy.log('確認連線到網頁內容')
      cy.visit('/')
    })
    it('建立新待辦事項',function(){
        cy.get('.form-control').type('今天與客戶有約')
    })
    it('點擊新增待辦事項',function(){
        cy.contains('新增').click()
    })
    it('點擊編輯',function(){
        cy.contains('編輯').last().click()
    })
    it('清空文字',function(){
        cy.get('input[type=text]').last().clear()
    })
    it('編輯文字為今天晚上與客戶有約',function(){
        cy.get('input[type=text]').last().type('今天晚上與客戶有約')
    })
    it('點擊儲存',function(){
        cy.contains('儲存').click()
    })
    it('點擊已完成checkbox',function(){
        cy.get('[type="checkbox"]').last().check()
    })
    it('點擊全部項目過濾待辦事項',function(){
        cy.get('button').contains('全部項目').click()
        cy.wait(2000)
    })
    it('點擊進行中過濾待辦事項',function(){
        cy.get('button').contains('進行中').click()
        cy.wait(2000)
    })
    
    it('點擊已完成過濾待辦事項',function(){
        cy.get('button').contains('已完成').click()
    })

    it('點擊地圖',function(){
        cy.get('#gmap').trigger('mapRclick',{which:1})
    })

    it('點擊刪除',function(){
        cy.get('button').contains('刪除').click()
    })
    
  })