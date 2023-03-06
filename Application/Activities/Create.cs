using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest  //命令是不返回內容
        {
            public Activity Activity { get; set; } //創建Activity該物件並傳遞給Command處理
        }

        public class Handler : IRequestHandler<Command>   //一樣不會返回任何東西
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); //先將Activity物件增加至記憶體

                await _context.SaveChangesAsync(); //從記憶體寫入資料庫

                return Unit.Value; //為解決Handle()還是需要回傳值 Unit.Value屬於無資料
            }
        }
    }
}